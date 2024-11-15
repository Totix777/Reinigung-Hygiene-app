export function exportToCSV(tasks: any[], filename: string) {
  // Sort tasks by floor and date
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by floor
    const floorA = a.roomNumber[0];
    const floorB = b.roomNumber[0];
    if (floorA !== floorB) return floorA.localeCompare(floorB);
    
    // Then sort by date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Group tasks by month and floor
  const groupedTasks = sortedTasks.reduce((acc: any, task) => {
    const date = new Date(task.date);
    const month = date.toLocaleString('de-DE', { month: 'long', year: 'numeric' });
    const floor = getFloorName(task.roomNumber[0]);
    
    if (!acc[month]) acc[month] = {};
    if (!acc[month][floor]) acc[month][floor] = [];
    
    acc[month][floor].push(task);
    return acc;
  }, {});

  // Create CSV content with sections
  let csvContent = '';
  
  // Headers
  const headers = [
    'Datum',
    'Uhrzeit',
    'Zimmer',
    'Mitarbeiter',
    'Sichtreinigung',
    'Unterhaltsreinigung',
    'Zimmer Grundreinigung',
    'Bett Grundreinigung',
    'Fenster und Gardinen',
    'Notizen'
  ];

  // Add data for each month and floor
  Object.entries(groupedTasks).forEach(([month, floors]: [string, any]) => {
    csvContent += `\n${month}\n`;
    csvContent += headers.join(';') + '\n';

    Object.entries(floors).forEach(([floor, floorTasks]: [string, any]) => {
      csvContent += `${floor}\n`;
      
      floorTasks.forEach((task: any) => {
        const row = [
          task.date,
          task.time,
          task.roomNumber,
          task.staffName,
          task.visualCleaning ? 'X' : '',
          task.maintenanceCleaning ? 'X' : '',
          task.basicRoomCleaning ? 'X' : '',
          task.bedCleaning ? 'X' : '',
          task.windowsCurtainsCleaning ? 'X' : '',
          task.notes.replace(/"/g, '""') // Escape quotes in notes
        ];
        csvContent += row.join(';') + '\n';
      });
      
      csvContent += '\n'; // Add space between floors
    });
  });

  // Create and trigger download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getFloorName(floorNumber: string): string {
  const floors: Record<string, string> = {
    '1': 'EG Schlosspark',
    '2': '1.OG Ebertpark',
    '3': '2.OG Rheinufer',
    '4': '3.OG An den Seen'
  };
  return floors[floorNumber] || floorNumber;
}