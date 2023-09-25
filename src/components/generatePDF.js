// import jsPDF from 'jspdf';

// const generatePDF = (fromDate, toDate, tableData) => {
//     const doc = new jsPDF();

//     // Set the font size and text color
//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0);

//     // Add "From Date" and "To Date" to the PDF
//     doc.text(`From Date: ${fromDate.toDateString()}`, 10, 10);
//     doc.text(`To Date: ${toDate.toDateString()}`, 10, 20);

//     // Add the table header
//     const headers = ['Date', 'Time', 'Cage', 'Defect', 'Image'];
//     const tableWidths = [40, 40, 40, 40, 80]; // Adjust widths as needed

//     doc.autoTable({
//         head: [headers],
//         theme: 'grid',
//         margin: { top: 30 },
//         startY: 30,
//         headStyles: { fillColor: [150, 150, 150] },
//         columnStyles: { 0: { columnWidth: tableWidths[0] }, 1: { columnWidth: tableWidths[1] }, 2: { columnWidth: tableWidths[2] }, 3: { columnWidth: tableWidths[3] }, 4: { columnWidth: tableWidths[4] } },
//     });

//     // Add table data
//     tableData.forEach((row, index) => {
//         doc.autoTable({
//             body: [row], // Assuming each row is an array of data
//             startY: index === 0 ? 45 : doc.autoTable.previous.finalY + 5,
//             columnStyles: { 0: { columnWidth: tableWidths[0] }, 1: { columnWidth: tableWidths[1] }, 2: { columnWidth: tableWidths[2] }, 3: { columnWidth: tableWidths[3] }, 4: { columnWidth: tableWidths[4] } },
//         });
//     });

//     // Save the PDF with a specific file name
//     const fileName = `table_data_${fromDate.toISOString().substring(0, 10)}_${toDate.toISOString().substring(0, 10)}.pdf`;
//     doc.save(fileName);
// };

// export default generatePDF;
