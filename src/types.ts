export interface CleaningTask {
  id: string;
  date: string;
  time: string;
  roomNumber: string;
  visualCleaning: boolean;
  maintenanceCleaning: boolean;
  basicRoomCleaning: boolean;
  bedCleaning: boolean;
  windowsCurtainsCleaning: boolean;
  notes: string;
  staffName: string;
}

export interface Floor {
  id: string;
  name: string;
  rooms: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  staffName: string;
}