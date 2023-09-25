import React from 'react';
import { useState } from 'react';
import DefectModalYes from './DefectModalYes';
import "./componentscss/YES.css";

function YES({identifier, onCopyImage}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDefect, setSelectedDefect] = useState('');
    const [otherDefect, setOtherDefect] = useState('');
    

      const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };
    
      const handleConfirm = (defect, customDefect, identifier) => {
        setSelectedDefect(defect);
        console.log(defect);
        
        setOtherDefect(customDefect);
        console.log(customDefect);
        

        onCopyImage(defect, customDefect, identifier);
      };



  return (
    <div>
      <button className='yes' onClick={openModal}>YES</button> 
      {modalOpen && (
        <DefectModalYes onClose={closeModal} onConfrim={handleConfirm} identifier={identifier} />
      )}
      {/* {selectedDefect && (
        <div>
            Selected Defect:{selectedDefect}
            {selectedDefect === "Others" && (
                <div>Other Defect:{otherDefect}</div>
            )}
        </div>
      )} */}
    </div>
  )
}

export default YES;
