import React from 'react';
import MainButton from './MainButton';
import Toggle from './Toggle';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({toggleSidebar}) {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate(`/write`);
  };
  return (
    <div className="w-full flex flex-col  p-5">
      <div className="w-full flex justify-center">
        <MainButton onclick={() => {
           handleOnclick();
           toggleSidebar();
        }} />
      </div>
      <div className="w-full flex mt-5 justify-center">
         <Toggle toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
