import React, {useEffect, useState} from 'react';
import PaperList from '../components/PaperList';
import { useAuthContext } from '../context/AuthContext';

export default function Receive() {
  const [stateFromChild, setStateFromChild] = useState(null);

   useEffect(() => {
      if (stateFromChild !== null) {
         // stateFromChild가 변경될 때마다 실행할 로직
      }
   }, [stateFromChild]);

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
