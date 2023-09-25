import React, { useState, forwardRef, useRef} from 'react';
import './componentscss/Topbar.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import ShiftDropdown from './ShiftDropdown';
import CageDropdown from './CageDropdown';
import "./componentscss/CalendarIcon.css";
// import generatePDF from './generatePDF';
import DownloadForm from './DownloadForm';
// import { useReactToPrint } from 'react-to-print';
// import {SelectedCageProvider} from "./SelectedCageContext"

export default function Topbar({ 
    selectedDate,
    setSelectedDate,
    selectedCage,
    setSelectedCage,
    handleDateChange,
    selectedShift,
    setSelectedShift,
    downloadFormOpen, 
    setDownloadFormOpen, 
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    generatePDF}) {

  

  // const handleDownload = (fromDate, toDate) =>{
  //   // Logic to generate and download PDF with fromDate and toDate
  //   console.log("Downloading PDF from", fromDate, "to", toDate);
  // }
  // const componentPDF = useRef();
  
  // const generatePDF = useReactToPrint({
  //   content: () => componentPDF.current,
  //   documentTitle: "userData",
  //   onAfterPrint: () => alert("Data saved in pdf")
  // })

  const handleDownloadPopup = () =>{
    setDownloadFormOpen(true);
  }
    
  

    // code for the custom calendar icon  
    const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
      <input
        value={value}
        className="example-custom-input"
        onClick={onClick}
        onChange={onChange}
        ref={ref}
      ></input>
    ));

  return (
    <div className='topbar-container'>
        <div className='topbar-left'>
            <button className='topbar-left-button disable'>RST 1</button> 
            <button className='topbar-left-button disable'>RST 2</button>
            <button className='topbar-left-button disable'>RST 3</button>
            <button className='topbar-left-button disable'>RST 4</button>
            <button className='topbar-left-button hoverable'>RST 5</button>
            <button className='topbar-left-button disable'>RST 6</button>
        </div>

        <div className='topbar-right'>
            {/* <button className='topbar-right-button'>Cage</button> */}
            
            <CageDropdown
            //  cages={cages}
             className="topbar-right-button"
             selectedCage={selectedCage}
             setSelectedCage={setSelectedCage}
             />
             
            
            {/* <label className='topbar-right-button'>
              <select>
                <option value="7am - 3pm">7am - 3pm</option>
                <option value="3pm - 11pm">3pm - 11pm</option>
                <option value="11pm - 7am">11pm - 7am</option>
              </select>
            </label> */}

            <ShiftDropdown
            //  shiftTimings={shiftTimings}
             className="topbar-right-button"
             selectedShift={selectedShift}
             setSelectedShift={setSelectedShift} />
             
            {/* <button className='topbar-right-button'>Selected Date</button> */}
            <DatePicker 
             className='topbar-right-button'
             selected={selectedDate}
             onChange={handleDateChange}
             customInput={<ExampleCustomInput />}
            //  placeholderText='Please Select a Date...'
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            scrollableMonthYearDropdown
             />
            <button className='topbar-right-button download-button' onClick={handleDownloadPopup}>Download</button>
            {/* {downloadFormOpen && (
              <DownloadForm onClose={() => setDownloadFormOpen(false)} 
               fromDate={fromDate}
               setFromDate={setFromDate}
               toDate={toDate}
               setToDate={setToDate}
              //  generatePDF={generatePDF}

              />
            )} */}
            
        </div>  
        
        
    </div>
  )
}
