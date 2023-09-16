import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
     <AuthContextProvider>
       <div className="flex flex-col h-screen">
         <header>
           <Header toggleSidebar={toggleSidebar} />
         </header>
         <div className="flex-grow flex">
           <div className={`${isSidebarOpen || 'hidden sm:block'} flex-shrink-0 flex-basis-1/6 bg-red-50 border-r border-r-gray-300`}>
             <Sidebar />
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
