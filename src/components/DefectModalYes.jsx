import React from 'react';
import { useState,useEffect } from 'react';
import "./componentscss/DefectModal.css";

function DefectModalYes({ onClose, onConfrim, identifier }) {

    const Defects = ["Patch", "Dent","Loose Wire", "Black Wire", "Others"];
    const [selectedDefect, setSelectedDefect] = useState();
    const [otherDefect, setOtherDefect] = useState('');
    const [allDefects, setAllDefects] = useState(Defects);
   

    // useEffect(() =>{
    //     if(otherDefect){
    //         setAllDefects([...allDefects, otherDefect]);
    //     }
    // }, [allDefects,otherDefect]);

    const handleSelectedDefect = (event) =>{
        setSelectedDefect(event.target.value);
        console.log(event.target.value);
    }

    const handleOtherDefect = (event) =>{
    
        setOtherDefect(event.target.value);
        console.log(otherDefect);
    }

    const handleConfirm = () =>{
        if(selectedDefect === "Others"){
            
            onConfrim("Others", otherDefect, identifier);
        } 
        else{
            onConfrim(selectedDefect, null, identifier);
        }
       
        if(otherDefect){
            setAllDefects([...allDefects, otherDefect]);
            setOtherDefect("");
        }
        onClose();
    }

    console.log(allDefects);
    
   
  return (
    <div className='defect-modal-overlay'>
     <div className='defect-modal'>
        <div className='select-container'>
            <select className='select-modal' value={selectedDefect} onChange={handleSelectedDefect}>
                <option value="" hidden> Select Defect</option>
                {allDefects.map((defect, index) =>(
                    <option className='select-option' key={index} value={defect}>
                        {defect}
                    </option>
                ))}
            </select>
        </div>
        
        {selectedDefect === "Others" && (
            <input
            className='ip-field'
            type="text"
            value={otherDefect}
            onChange={handleOtherDefect}
            placeholder="Enter defect..." />
        )}
        <div className="button-container-modal">
          <button className='ok' onClick={handleConfirm}>OK</button>
          <button className='cancel' onClick={onClose}>Cancel</button>
        </div>
     </div>
      
    </div>
  )
}

export default DefectModalYes;
