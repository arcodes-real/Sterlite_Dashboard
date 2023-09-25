import React, { useState } from 'react'
// import './componentscss/Topbar.css';

function ShiftDropdown({ className, selectedShift, setSelectedShift }) {
    // const [selectedShift, setSelectedShift] = useState(" ");

    const shiftTimings = ["All","Shift 1", "Shift 2", "Shift 3"];

    const handleSelectChange = (event) =>{
        setSelectedShift(event.target.value);
    }
  return (
    <div>
      {/* <label htmlFor='shiftDropdown'>Shifts</label> */}
      <select required  className={className} value={selectedShift} onChange={handleSelectChange}>
        <option value="" hidden>Shifts</option>
        {shiftTimings.map((shift, index) => (
            <option key={index} value={shift}>
                {shift}
            </option>
        ))}
      </select>
    </div>
  );
}

export default ShiftDropdown;
