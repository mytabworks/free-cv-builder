export function downloadData(data: any, filename: string, type = 'application/json') {
  // 1. Convert JSON data to a string
  const jsonString = type === 'application/json' && typeof data === "object" ? JSON.stringify(data, null, 2) : data;

  // 2. Create a blob from the string
  const blob = new Blob([jsonString], { type });

  // 3. Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // 4. Create an anchor element and trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // 5. Clean up and revoke the object URL
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}