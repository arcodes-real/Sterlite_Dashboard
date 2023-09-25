import React, { useState } from 'react';
import "./componentscss/Toggle.css";

// export default function Toggle({toggle, handleToggleChange}) {
//   return (
//     <div className='toggle-container' onClick={handleToggleChange}>
//         <div className={`toggle-btn ${!toggle ? "disable" : ""}`}>
//         {toggle? "YES" : "NO"}
//         </div>
      
//     </div>
//   );
// }

const Toggle = ({label}) =>{
  const [isToggled, setIsToggled] = useState(false); 

  const handleToggle = () =>{
    setIsToggled(prevState => !prevState);
  };

  const buttonStyle = {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    backgroundColor: isToggled ? '#1F924A' : '#E70303',
    color: '#fff',
    lineHeight: '16px'
  };
  

  return(
    <div>
      <button onClick={handleToggle} style={buttonStyle}> 
        
       {isToggled? "YES" : "NO"}
        
      </button>
    </div>
  );
};

export default Toggle;
