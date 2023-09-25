import React, { createContext, useContext, useState } from 'react'

const SelectedCageContext = createContext();

export default function SelectedCageProvider({children}) {
    const [selectedCage, setSelectedCage] = useState(null);

    return(
        <SelectedCageContext.Provider value={{selectedCage,setSelectedCage}}>
            {children}
        </SelectedCageContext.Provider>
    );
}

export function useSelectedCage(){
    return useContext(SelectedCageContext);
}


