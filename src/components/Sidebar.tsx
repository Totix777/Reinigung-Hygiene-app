import React from 'react';
import { Building2 } from 'lucide-react';
import type { Floor } from '../types';

interface Props {
  floors: Floor[];
  selectedFloor: string;
  onSelectFloor: (floorId: string) => void;
  isOpen: boolean;
}

export default function Sidebar({ floors, selectedFloor, onSelectFloor, isOpen }: Props) {
  if (!isOpen) return null;

  return (
    <div className="w-48 bg-white shadow-lg fixed h-full left-0 top-0 lg:sticky z-50">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">Wohnbereiche</h2>
        </div>
        
        <nav className="space-y-1">
          {floors.map(floor => (
            <button
              key={floor.id}
              onClick={() => onSelectFloor(floor.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedFloor === floor.id
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {floor.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}