import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
     <AuthContextProvider>
       <div className="flex flex-col h-screen">
         <header>
           <Header />
         </header>
         <div className="flex grow">
           <div className="basis-1/6 flex">
             <Sidebar />
           </div>
           <QueryClientProvider client={queryClient}>
             <main className="basis-5/6 overflow-y-auto max-h-[calc(100vh-4.1rem)]">
               <Outlet />
             </main>
           </QueryClientProvider>
         </div>
       </div>
     </AuthContextProvider>
  );
}

export default App;

