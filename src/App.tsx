import React, { useState, useEffect } from 'react';
import { Building, LogOut } from 'lucide-react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './lib/firebase';
import { floors } from './data/floors';
import FloorSection from './components/FloorSection';
import TaskHistory from './components/TaskHistory';
import LoginForm from './components/LoginForm';
import type { CleaningTask, AuthState } from './types';

function App() {
  const [tasks, setTasks] = useState<CleaningTask[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState<string>(floors[0].id);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, staffName: '' };
  });

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CleaningTask[];
      
      setTasks(tasksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const handleLogin = (staffName: string) => {
    setAuth({ isAuthenticated: true, staffName });
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, staffName: '' });
  };

  const handleSaveTask = async (task: Omit<CleaningTask, 'id'>) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        staffName: auth.staffName
      });
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Fehler beim Speichern der Aufgabe. Bitte versuchen Sie es erneut.');
    }
  };

  if (!auth.isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Lade Daten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building className="w-6 h-6 text-red-600" />
              <h1 className="text-xl font-bold text-gray-900">DRK Pflegeheim</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Angemeldet als: <strong>{auth.staffName}</strong>
              </span>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-700 shrink-0"
              >
                {showHistory ? 'Zurück zur Eingabe' : 'Reinigungsverlauf'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 text-sm rounded-md hover:bg-gray-300 shrink-0"
              >
                <LogOut className="w-4 h-4" />
                Abmelden
              </button>
            </div>
          </div>
          
          {!showHistory && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {floors.map(floor => (
                <button
                  key={floor.id}
                  onClick={() => setSelectedFloor(floor.id)}
                  className={`px-4 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                    selectedFloor === floor.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {floor.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 py-4">
        {showHistory ? (
          <TaskHistory tasks={tasks} />
        ) : (
          <FloorSection
            floor={floors.find(f => f.id === selectedFloor)!}
            tasks={tasks.filter(task => task.roomNumber.startsWith(selectedFloor[0]))}
            onSaveTask={handleSaveTask}
            staffName={auth.staffName}
          />
        )}
      </main>
    </div>
  );
}

export default App;