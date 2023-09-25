import React, { useState } from 'react';
import YES from './YES';
import NO from './NO';
import DefectModalYes from './DefectModalYes';
import './componentscss/Table.css';

function ImageRows({ selectedDate, timestamp, cageName, imgURL, identifier, handleRemoveRow }) {
  const [selectedDefect, setSelectedDefect] = useState('');
  const [otherDefect, setOtherDefect] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = (defect, other) => {
    setSelectedDefect(defect);
    setOtherDefect(other);
  };

  return (
    <tr>
      <td datalabel="DATE">{selectedDate.toLocaleDateString()}</td>
      <td datalabel="TIME">{timestamp}</td>
      <td datalabel="CAGE">{cageName}</td>
      <td datalabel="VERIFY">
        <div className='verify-buttons'>
          <YES identifier={identifier} openModal={openModal} />
          <NO identifier={identifier} onRemove={handleRemoveRow} />
        </div>
      </td>
      <td datalabel="IMAGE">
        <img src={`https://cvsterlite.s3.ap-south-1.amazonaws.com/${imgURL}`} alt="No_Image_Available" />
      </td>
      {modalOpen && (
        <DefectModalYes onClose={closeModal} onConfrim={handleConfirm} identifier={identifier} />
      )}
      {selectedDefect && (
        <div>
          Selected Defect: {selectedDefect}
          {selectedDefect === "Others" && (
            <div>Other Defect: {otherDefect}</div>
          )}
        </div>
      )}
    </tr>
  );
}

export default ImageRows;
