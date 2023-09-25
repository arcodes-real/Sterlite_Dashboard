import React, { useState } from 'react';
// import { useSelectedCage } from './SelectedCageContext';

function CageDropdown({ className, selectedCage, setSelectedCage }) {

    // const [selectedCage, setSelectedCage] = useState(" ");

    const cages = ["All","Cage 12", "Cage 18", "Cage 24"];

    const handleSelectCage = (event) =>{
        setSelectedCage(event.target.value);
        console.log(event.target.value);
    }
  return (
    <div>
      <div>
        <select className={className} value={selectedCage} onChange={handleSelectCage}>
            <option value="" hidden>Cage</option>
            {cages.map((cage, index) =>(
                <option key={index} value={cage}>
                    {cage}
                </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default CageDropdown;
