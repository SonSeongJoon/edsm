import React, { useEffect, useState } from 'react';
import PaperList from '../components/PaperList';

export default function Wait() {
  const [stateFromChild, setStateFromChild] = useState(null);

  useEffect(() => {
    if (stateFromChild !== null) {
      // stateFromChild가 변경될 때마다 실행할 로직
    }
  }, [stateFromChild]);
  return (
    <div>
      <PaperList
        key={stateFromChild}
        category="대기"
        state="대기"
        adminData={false}
        setStateFromChild={setStateFromChild}
      />
    </div>
  );
}
