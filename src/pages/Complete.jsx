import React, { useState } from 'react';
import PeperList from '../components/PaperList';

export default function Complete() {
  const [stateFromChild, setStateFromChild] = useState(null);

  return (
    <div>
      <PeperList
        key={stateFromChild}
        category="승인"
        state="승인"
        adminData={false}
        setStateFromChild={setStateFromChild}
      />
    </div>
  );
}
