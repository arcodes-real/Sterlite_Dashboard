import React, { createContext, useContext } from 'react';

// Create a context
const TableDataContext = createContext();

// Create a custom hook to access the context
export function useTableData() {
  return useContext(TableDataContext);
}

// Export the context provider
export function TableDataProvider({ children, generatePDF }) {
  return (
    <TableDataContext.Provider value={generatePDF}>
      {children}
    </TableDataContext.Provider>
  );
}
