import React, { useState } from 'react';
import "./componentscss/NO.css";

function NO({ identifier, onRemove }) {

  const [showWarningPopup, setShowWarningPopup] = useState(false);

  const handleNoButtonClick = () =>{
    setShowWarningPopup(true);
  }

  const handleOkClick = () =>{
    // here do something if ok is clicked
    setShowWarningPopup(false);
    onRemove(identifier); // passing the identifier to the parent component 
  }

  const handleCancelClick = () =>{
    setShowWarningPopup(false);
  }

  return (
    <div>
      <button className='no' onClick={handleNoButtonClick}>NO</button>

      {showWarningPopup && (
        <div className='warning-popup'>
          <p>Do you really want to remove the Defect?</p>
            <div className='warning-popup-buttons'>
              <button className='warning-popup-ok' onClick={handleOkClick}>OK</button>
              <button className='warning-popup-cancel' onClick={handleCancelClick}>Cancel</button>
            </div>
        </div>
      )}
    </div>
  )
}

export default NO;
