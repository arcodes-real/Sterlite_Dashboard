// import React, { useState } from 'react';
// import "./componentscss/DownloadForm.css";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// // import { useGeneratePDF } from "./GeneratePDFContext";
// import { PDFDocument, rgb } from 'pdf-lib';
// import { useTableData } from './TableDataContext';

// export default function DownloadForm( {onClose, onDownloads, fromDate, setFromDate, toDate, setToDate } ){



//     // const generatePDF = useGeneratePDF();

//         const generatePDF = useTableData();
//         const handleDownload = () => {
           
//             generatePDF();
//             onClose();
//           }
    

//     const handleFromDateChange = (date) =>{
//         setFromDate(date);
//     }

//     const handleToDateChange = (date) =>{
//         setToDate(date);
//     }
        
    


//     return(
//         <div className='download-popup'>
//             {/* <h2>Download PDF</h2> */}
//             <div className='input-container'>
//                 <label htmlFor='fromDate'>From Date:</label>
//                 <DatePicker id='fromDate' selected={fromDate} dateFormat="dd/MM/yyyy" onChange={handleFromDateChange} />
//             </div>
//             <div className='input-container'>
//                 <label htmlFor='toDate'>To Date:</label>
//                 <DatePicker id='toDate' selected={toDate} dateFormat="dd/MM/yyyy" onChange={handleToDateChange} />
//             </div>
//             <div className='button-container'>
//                 <button className='ok-button' onClick={handleDownload}>OK</button>
//                 <button className='cancel-button' onClick={onClose}>Cancel</button>
//             </div>
//         </div>
//     );
// }



// try {
//     const tableData = getTableData; // Get the table data

//       // Create a new PDF document
//       const pdfDoc = await PDFDocument.create();

//       // Add a new page to the document
//       const page = pdfDoc.addPage([400, 400]);
//       const { width, height } = page.getSize();
//       const context = page.getContext('2d');

//       // Customize the appearance
//       context.beginPath();
//       context.rect(0, 0, width, height);
//       context.fillStyle = rgb(255, 255, 255); // Set the background color
//       context.fill();

//       context.font = '16px Helvetica';
//       context.fillStyle = rgb(0, 0, 0); // Set the text color

//       // Draw table data
//       let x = 50; // Adjust the x-coordinate for table data
//       let y = height - 100; // Adjust the y-coordinate for table data
//       const rowHeight = 20;

//       tableData.forEach((rowData) => {
//         x = 50; // Reset x-coordinate for each row
//         y -= rowHeight;

//         rowData.forEach((cell, index) => {
//           page.drawText(cell, {
//             x: x + index * 100, // Adjust the spacing between columns
//             y,
//             size: 14,
//             font: 'Helvetica',
//             color: rgb(0, 0, 0),
//           });
//         });
//       });

    //   // Generate a blob from the PDF
    //   const pdfBytes = await pdfDoc.save();

    //   // Create a blob
    //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    //   // Create a download link and trigger the download
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = `report_${fromDate}_${toDate}.pdf`;
    //   a.style.display = 'none';
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   URL.revokeObjectURL(url);
    // } catch (error) {
    //   console.error('Error generating PDF', error);
    // }