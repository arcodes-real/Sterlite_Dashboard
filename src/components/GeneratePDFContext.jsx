import React, { createContext, useContext } from 'react';

// Create a context
const GeneratePDFContext = createContext();

// Custom hook to access the context
export function useGeneratePDF() {
  return useContext(GeneratePDFContext);
}

export default GeneratePDFContext;
