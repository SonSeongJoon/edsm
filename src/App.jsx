import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';
import {VerificationStatusProvider} from "./context/VerificationStatusProvider";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const mainContentRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const scrollTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const checkScrollTop = () => {
      if (mainContentRef.current) {
        // 스크롤 위치가 100보다 크면 버튼을 표시합니다.
        if (!showScrollToTop && mainContentRef.current.scrollTop > 100) {
          setShowScrollToTop(true);
        } else if (showScrollToTop && mainContentRef.current.scrollTop <= 100) {
          setShowScrollToTop(false);
        }
      }
    };

    const mainElement = mainContentRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', checkScrollTop);
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', checkScrollTop);
      }
    };
  }, [showScrollToTop]);

  const queryClient = new QueryClient();

  return (
     <VerificationStatusProvider>
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
            <main
              ref={mainContentRef}
              className="flex-grow overflow-y-auto max-h-[calc(100vh-4.2rem)]"
            >
              <Outlet />
              {showScrollToTop && (
                <button
                  className="fixed top-20 right-5 p-2 bg-brand text-white font-bold rounded-full"
                  onClick={scrollTop}
                  title="Go to top"
                >
                  Top
                </button>
              )}
            </main>
          </QueryClientProvider>
        </div>
      </div>
    </AuthContextProvider>
     </VerificationStatusProvider>
  );
}

export default App;
