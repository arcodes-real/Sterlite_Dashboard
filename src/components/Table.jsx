import React, { useEffect, useState, useCallback, useRef } from 'react';
import './componentscss/Table.css';
import YES from './YES';
import NO from './NO';
import "./componentscss/Toggle.css";
// import ImageRows from './ImageRows';
// import { TableDataProvider } from './TableDataContext';
// import Topbar from './Topbar';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// import { useReactToPrint } from 'react-to-print';
// import { useSelectedCage } from './SelectedCageContext';
// import Toggle from './Toggle';



export default function Table({ selectedDate,
     selectedCage, 
     setSelectedCage, 
     formattedDate, 
     setFormattedDate, 
     selectedShift, 
     onDownload, 
     fromDate,
     toDate}) {

// state and setState function to store and update state respectively. imgURLs store the array of image urls.    
    const [imgURLs, setImgURLs] = useState([]);
    const [filteredImageURLs, setFilteredImageURLs] = useState([]);
    // const [removedImages, setRemovedImages] = useState([]);
    // const [selectedDefects, setSelectedDefects] = useState({});

    // const componentPDF = useRef();


    
    
// triggers when the component first mounts, to display today's(current date's) data, with cage 24 as default 
// setting the initial state of the formattedDate to todays date   
    useEffect(() => {
        const currentDate = new Date();
        const todayYear = currentDate.getFullYear();
        const todayMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // padding required to match format with backend  
        const todayDay = (currentDate.getDate()).toString().padStart(2, '0');  // padding required to match format with backend
    
        const todayDate = `${todayYear}-${todayMonth}-${todayDay}`;
    
        setFormattedDate(todayDate);
    }, []);
    
    
    const fetchImgURLs = useCallback(async() =>{
        try{
            let imageUrl = '';
            let imageUrls = []; // array to store image urls from all cages

            if(selectedCage === "All"){
                    const listDevices = ["jetson1", "jetson2","jetson3"];
                    for(let device of listDevices){
                        imageUrl =`http://localhost:7000/images/${device}/${formattedDate}/`;
                        // imageUrl =`http://3.7.70.110:7000/images/${device}/${formattedDate}/`;
                        const response = await fetch(imageUrl);
                        const data = await response.json();
                        const filteredImages = data.images.filter(image => !image.endsWith('/'));
                        imageUrls = imageUrls.concat(filteredImages);
                    }
                    console.log(imageUrls);
                    
                
                
            } else{
                const jetsonName = selectedCage === "Cage 12" ? "jetson1" : selectedCage === "Cage 18" ? "jetson2" : "jetson3";
                console.log(jetsonName);
                // imageUrl = `http://3.7.70.110:8080/images/${jetsonName}/${formattedDate}/`;
                imageUrl = `http://localhost:7000/images/${jetsonName}/${formattedDate}/`; 
                const response = await fetch(imageUrl);
                const data = await response.json();
                const filteredImages = data.images.filter(image => !image.endsWith('/'));
                imageUrls = filteredImages;
                
            }
            // console.log(imageUrl);
            
            
            setImgURLs(imageUrls);

        } catch(error){
            console.error("Error Fetching Images", error);
        }
    }, [selectedCage, formattedDate]);
    

// triggers fetchimgURLs function
    useEffect(() =>{
            if (formattedDate && formattedDate !== 'undefined') {
                fetchImgURLs();
            }
        },[formattedDate,fetchImgURLs]);


// function to filter images based on shift
        const filterImagesByShift = useCallback(() =>{
            if(!selectedShift || selectedShift === "All") { 
                setFilteredImageURLs(imgURLs);
                return;
            }
                const shiftStartTimes = {
                "Shift 1" : 7,
                "Shift 2" : 15,
                "Shift 3" : 23
            };
            const selectedShiftStartHour = shiftStartTimes[selectedShift];
            console.log(selectedShiftStartHour);
            const selectedShiftEndHour = (selectedShiftStartHour + 8) % 24;

            const filteredImages = imgURLs.filter((imgURL) =>{
                const Imgparts = imgURL.split("/");
                const ImgfileName = Imgparts[Imgparts.length - 1];
                const Imgtimestamp = ImgfileName.split("_")[0].split("-").slice(-3).join(":");
                console.log(Imgtimestamp);

                const hour = parseInt(Imgtimestamp.split(":")[0]);
                console.log(hour);
                console.log(selectedShiftStartHour);
                if (selectedShiftStartHour < selectedShiftEndHour) {
                    return hour >= selectedShiftStartHour && hour < selectedShiftEndHour;
                } else {
                    // Handle the case where the shift spans across midnight
                    return hour >= selectedShiftStartHour || hour < selectedShiftEndHour;
                }
            });
            console.log("Filtered Images:", filteredImages);
            setFilteredImageURLs(filteredImages);
             }, [imgURLs, selectedShift]);

        useEffect(() =>{
            filterImagesByShift();
        }, [filterImagesByShift]);

        const cageNameMappings = {
            jetson1: "Cage 12",
            jetson2: "Cage 18",
            jetson3: "Cage 24"
          };
        


        const handleCopyImage = async(defect, customDefect, identifier) =>{
            try{
                    const response = await fetch(`http://localhost:7000/copyImage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                         defect,
                         identifier,
                         customDefect 
                        }),
                });
                try{
                    if(response.ok){
                        console.log("image copied successfully");
                    } else{
                        console.error('Error copying image',response);
                    }
                } catch(err){
                    console.error("Error",err);
                }
                
            }catch(error){
                console.error('Error Copying Image', error);
            }
        };

        const handleConfirmDelete = async(identifier) =>{
            try{
                const response = await fetch(`http://localhost:7000/moveImage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        identifier
                    }),
                });
                try{
                    if(response.ok){
                        console.log("image moved successfully");
                    } else{
                        console.error('Error moving image',response);
                    }
                } catch(err){
                    console.error("Error",err);
                }
            }catch(error){
                console.error("Error deleting image", error);
            }
        }

        
        
return (

    <div className='table-container'>

       {/* <div ref={componentPDF} style={{width:"50%"}} > */}
        
        <table className='table'>
            <thead>
            <tr>
                <th>DATE</th>
                <th>TIME</th>
                <th>CAGE</th>
                <th>VERIFY</th>
                <th>IMAGE</th>
            </tr>
                
            </thead>
            <tbody>
            {filteredImageURLs.map((imgURL, index) => {
                const parts = imgURL.split("/");
                const fileName = parts[parts.length - 1]; // Get the last part of the URL

                // Extract the timestamp from the file name
                const timestamp = fileName.split("_")[0].split("-").slice(-3).join(":");

                // Extract the corresponding Cage name from the file name

                const cageNameFromUrl = imgURL.split("/")[2];
                const cageName = cageNameMappings[cageNameFromUrl];

                const identifier = imgURL;
                console.log(identifier);


                

                return (
                    <tr key={index}>
                    <td datalabel="DATE">{selectedDate.toLocaleDateString()}</td>
                    <td datalabel="TIME">{timestamp}</td>
                    <td datalabel="CAGE">{cageName}</td>
                    <td datalabel="VERIFY">
                        <div className='verify-buttons'>
                        <YES identifier={identifier} onCopyImage={handleCopyImage}  /> 
                        <NO identifier={identifier} onRemove={handleConfirmDelete}  />
                        </div>
                    </td>
                    <td datalabel="IMAGE">
                        <img src={`https://cvsterlite.s3.ap-south-1.amazonaws.com/${imgURL}`} alt="No_Image_Available" />
                    </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    </div>
    
  
  )
}
//  



                // useEffect(() =>{
    //     const currentDate = new Date();
    //     const todayYear = currentDate.getFullYear();
    //     const todayMonth = currentDate.getMonth() + 1;
    //     const todayDay = currentDate.getDate();

    //     const todayDate = `${todayYear}-${todayMonth}-${todayDay}`;

    //     setFormattedDate(todayDate);
    // }, []);

    // useEffect(() =>{
    //     fetchImgURLs(formattedDate);
    // }, [formattedDate]);

    // useEffect(() =>{
    //     const initialCage = "Cage 24";
    //     setSelectedCage(initialCage);
    // }, [setSelectedCage])

    // useEffect(() =>{
    //     fetchImgURLs(selectedCage);
    // }, [selectedCage]);



            //   const generatePDF = useReactToPrint({
        //     content: () => componentPDF.current,
        //     documentTitle: "userData",
        //     onAfterPrint: () => alert("Data saved in pdf")
        //   })

        // const getTableData = () => {
        //     const tableData = filteredImageURLs
        //       .filter((imgURL) => !removedImages.includes(imgURL))
        //       .map((imgURL) => {
        //         // Extract data from imgURL and format it into an array representing a row
        //         const parts = imgURL.split("/");
        //         const fileName = parts[parts.length - 1];
        //         const timestamp = fileName.split("_")[0].split("-").slice(-3).join(":");
        //         const cageNameFromUrl = imgURL.split("/")[2];
        //         const cageName = cageNameMappings[cageNameFromUrl];
        
        //         // Customize this array to include the data you want in each row
        //         return [selectedDate.toLocaleDateString(), timestamp, cageName, 'YES/NO'];
        //       });
        
        //     // Add headers to your table data
        //     const tableHeaders = ['DATE', 'TIME', 'CAGE', 'VERIFY'];
        
        //     return [tableHeaders, ...tableData];
        //   };

        // const generatePDF = () =>{
        //     const doc = new jsPDF();
        //     doc.text("Defect Details", 20,10);
            
        //     doc.save('table.pdf');
        // }



                //         {/* <tr key={index}>
                //     <td datalabel="DATE">{selectedDate.toLocaleDateString()}</td>
                //     <td datalabel="TIME">{timestamp}</td>
                //     <td datalabel="CAGE">
                //     {selectedCage === "All" ? cageName : selectedCage !== ""? selectedCage : "No Cage Seledted"}
                //     </td>
                //     <td datalabel="VERIFY">
                //     <div className='verify-buttons'>
                //     <YES identifier={imgURL} />
                //     <NO identifier={identifier} onRemove={handleRemoveRow} />
                //     </div>
                //     </td>
                //     <td datalabel="IMAGE">
                //     <img src={`https://cvsterlite.s3.ap-south-1.amazonaws.com/${imgURL}`} alt="No_Image_Available" />
                //     </td>
                // </tr> */}


                //                 {/* const handleRemoveRow = ((identifierToRemove) =>{
                //     setFilteredImageURLs((prevImages) =>
                //     prevImages.filter((url) => url !== identifierToRemove));

                //     setRemovedImages((prevRemovedImages) =>
                //     [...prevRemovedImages, identifierToRemove]);
                // }); */}
                // .filter((imgURL) => !removedImages.includes(imgURL))