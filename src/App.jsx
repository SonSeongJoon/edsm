import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <div className="flex flex-col h-screen">
        <header>
          <Header toggleSidebar={toggleSidebar} />
        </header>
        <div className="flex-grow flex relative">
          <div
            className={`${
              isSidebarOpen ? '' : 'hidden'
            } md:block  md:static top-0 left-0 h-[calc(100vh - 4rem)] flex-shrink-0 flex-basis-1/6 bg-red-50 border-r border-r-gray-300`}
          >
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
          <QueryClientProvider client={queryClient}>
            <main className="flex-grow overflow-y-auto max-h-[calc(100vh-4.1rem)]">
              <Outlet />
            </main>
          </QueryClientProvider>
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
