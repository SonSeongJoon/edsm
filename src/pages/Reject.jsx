import React, {useEffect, useState} from 'react';
import PeperList from '../components/PaperList';

export default function Reject() {
  const [stateFromChild, setStateFromChild] = useState(null);

   useEffect(() => {
      if (stateFromChild !== null) {
         // stateFromChild가 변경될 때마다 실행할 로직
      }
   }, [stateFromChild]);

  return (
    <div>
      <PeperList
        key={stateFromChild}
        category="반려"
        state="반려"
        adminData={false}
        setStateFromChild={setStateFromChild}
        MstData={false}
      />
    </div>
  );
}
