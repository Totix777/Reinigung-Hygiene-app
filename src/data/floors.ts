export const floors = [
  {
    id: 'eg',
    name: 'EG Schlosspark',
    rooms: [
      ...Array.from({ length: 27 }, (_, i) => `1${String(i + 1).padStart(2, '0')}`),
      '1G1', // Gäste WC
      '1M1', // Mitarbeiter WC
      '1B1', // Behinderten WC
      '1P1', // Pflegebad
    ],
  },
  {
    id: '1og',
    name: '1.OG Ebertpark',
    rooms: [
      ...Array.from({ length: 27 }, (_, i) => `2${String(i + 1).padStart(2, '0')}`),
      '2G1', // Gäste WC
      '2M1', // Mitarbeiter WC
      '2B1', // Behinderten WC
      '2P1', // Pflegebad
    ],
  },
  {
    id: '2og',
    name: '2.OG Rheinufer',
    rooms: [
      ...Array.from({ length: 27 }, (_, i) => `3${String(i + 1).padStart(2, '0')}`),
      '3G1', // Gäste WC
      '3M1', // Mitarbeiter WC
      '3B1', // Behinderten WC
      '3P1', // Pflegebad
    ],
  },
  {
    id: '3og',
    name: '3.OG An den Seen',
    rooms: [
      ...Array.from({ length: 27 }, (_, i) => `4${String(i + 1).padStart(2, '0')}`),
      '4G1', // Gäste WC
      '4M1', // Mitarbeiter WC
      '4B1', // Behinderten WC
      '4P1', // Pflegebad
    ],
  },
];