import React, { useState, useEffect, useRef } from "react";
import "./componentscss/Dashboard.css";
import "./componentscss/DashboardRight.css";
import Logo from "../Images/Quant-AI.png";
import { FaHome } from 'react-icons/fa';
import { RxBell } from "react-icons/rx";
import { ReactComponent as Graph } from "../Logos/AnalyticsLogo.svg";
import { ReactComponent as Report } from "../Logos/ReportLogo.svg";
import { ReactComponent as Support } from "../Logos/SupportLogo.svg";
import { ReactComponent as Settings } from "../Logos/SettingsLogo.svg";
import { ReactComponent as Logout } from "../Logos/LogoutLogo.svg";
import { ReactComponent as MeatBall } from "../Logos/MeatBall.svg";
import Topbar from "./Topbar";
import Table from "./Table";
// import { TableDataProvider } from "./TableDataContext";
// import GeneratePDFContext from "./GeneratePDFContext";
// import { saveAs } from 'file-saver';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import { PDFDocument, rgb } from 'pdf-lib';
// import GeneratePDFProvider from "./GeneratePDFContext";
// import { useReactToPrint } from 'react-to-print';



function Dashboard(){
    const [activeButton, setActiveButton] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState();
    const [selectedCage, setSelectedCage] = useState("All");
    const [selectedShift, setSelectedShift] = useState();
    const [downloadFormOpen, setDownloadFormOpen] = useState(false);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    
  
    // const componentPDF = useRef();


    const handleButtonClick = (buttonIndex) => {                    
        setActiveButton(buttonIndex);
      };      
      
    // formatting a date to the required format only when a date is selected  
      const handleDateChange = (date) =>{

        if(date){
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2,'0');
          const day = (date.getDate()).toString().padStart(2,'0');
  
          const newformattedDate = `${year}-${month}-${day}`;
          setFormattedDate(newformattedDate);
          setSelectedDate(date);
          console.log(date);
          console.log(newformattedDate);
          console.log(typeof(newformattedDate)); // string
        } else{
          setSelectedDate(null);
        }
        
      }


      




      // const generatePDF = useReactToPrint({
      //   content: () => componentPDF.current,
      //   documentTitle: "userData",
      //   onAfterPrint: () => alert("Data saved in pdf")
      // })


    return(
        <div className="dashboard-container">
         <div className="dashboard-left">
          <div className="dashboard-left-top">
            <div className="dashboard-title">
              <div className="dashboard-title-left">
                {/* <div className="dashboard-title-padding"> */}
                <img src={Logo} alt="LOGO" className="quant-logo" /> 
                <span className="logo-text">Quant VIZ</span>
                {/* </div> */}
              </div>
              
            </div>
            
            <div className="dashboard-left-main">
            <button disabled
              className={`dashboard-icon-container-btn ${
                activeButton === 0 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(0)}
            >
            <FaHome className="icon" />
              <span>Home</span>
            </button>

            <button disabled
              className={`dashboard-icon-container-btn ${
                activeButton === 1 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(1)}
            >
            <Graph className="icon" />
              <span>Analytics</span>
            </button>

            <button disabled
              className={`dashboard-icon-container-btn ${
                activeButton === 2 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(2)}
            >
            <Report className="icon" />
              <span>Report</span>
            </button>

            <button disabled
              className={`dashboard-icon-container-btn ${
                activeButton === 3 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(3)}
            >
            <Support className="icon" />
              <span>Support</span>
            </button>

            <button disabled
              className={`dashboard-icon-container-btn ${
                activeButton === 4 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(4)}
            >
            <Settings className="icon" />
              <span>Settings</span>
            </button>

            

            </div>
          </div>

          <button disabled
          className={`dashboard-left-footer-btn ${
            activeButton === 6 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(6)}
        >
          <Logout className="ic" />
          <span>Logout</span>
        </button>
        </div>

        <div className="dashboard-right">
        <div className="dashboard-right-top">
          <div className="dashboard-title-right">
            <span className="dashboard-title-right-span">DAILY DEFECT DATA</span>       
            {/* <span className="dashboard-right-subtitle">
             
            </span> */}
          </div>
            <div className="dashboard-title-end">
            <button className="dashboard-right-icon-btn">
              <RxBell className="icon-right" />
            </button>

            <button className="dashboard-right-icon-btn">
              <MeatBall className="icon-right" />
            </button>
            </div>
      </div>
      
      
       <div className="dashboard-right-main">
         
       {/* <TableDataProvider value={generatePDF}> */}
            <Topbar
             selectedDate = {selectedDate}
             setSelectedDate = {setSelectedDate} 
             formattedDate={formattedDate}
             setFormattedDate={setFormattedDate}
             selectedCage={selectedCage} 
             setSelectedCage={setSelectedCage}
             handleDateChange={handleDateChange}
             selectedShift={selectedShift}
             setSelectedShift={setSelectedShift}
             downloadFormOpen={downloadFormOpen}
             setDownloadFormOpen={setDownloadFormOpen}
             fromDate={fromDate}
             setFromDate={setFromDate}
             toDate={toDate}
             setToDate={setToDate}
            //  generatePDF={generatePDF}
              />
       {/* </TableDataProvider>      */}
            
            <Table 
             selectedDate = {selectedDate} 
             selectedCage={selectedCage} 
             setSelectedCage={setSelectedCage}
             formattedDate={formattedDate}
             setFormattedDate={setFormattedDate}
             selectedShift={selectedShift}
             fromDate={fromDate}
             toDate={toDate}
            //  generatePDF={generatePDF}
             />
            {/* </div> */}

            
            
          
          
        </div>
        
      </div> 
    </div> // container div

    )
}
export default Dashboard;






