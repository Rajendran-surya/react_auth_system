import * as XLSX from 'xlsx';

const exportToExcel = (data, filename) => {
  // Check if utils is defined
  if (!XLSX.utils) {
    console.error("XLSX.utils is not defined.");
    return;
  }

  // Convert data to worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Create workbook and append worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Convert workbook to binary string
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

  // Create Blob object and trigger download
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'data.xlsx'; // Use provided filename or default to 'data.xlsx'
  link.click();

  // Clean up
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 100);
};

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}

export default exportToExcel;
