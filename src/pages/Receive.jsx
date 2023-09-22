import React, { useState } from 'react';
import PaperList from '../components/PaperList';
import { useAuthContext } from '../context/AuthContext';

export default function Receive() {
  const [stateFromChild, setStateFromChild] = useState(null);

  const admin = useAuthContext();
  const uid = admin.user.uid;
  return (
    <div>
      <PaperList
        key={stateFromChild}
        category="receive"
        state={uid}
        adminData={true}
        setStateFromChild={setStateFromChild}
      />
    </div>
  );
}
