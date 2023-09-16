import React from 'react';
import PeperList from '../components/PaperList';
import { useAuthContext } from '../context/AuthContext';

export default function Receive() {
  const admin = useAuthContext();
  const uid = admin.user.uid;
  return (
     <div>
       <PeperList category='receive' state={uid} adminData={true}/>
     </div>
  );
}
