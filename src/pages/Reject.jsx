import React, { useState } from 'react';
import PeperList from '../components/PaperList';

export default function Reject() {
  const [stateFromChild, setStateFromChild] = useState(null);

  return (
    <div>
      <PeperList
        key={stateFromChild}
        category="반려"
        state="반려"
        adminData={false}
        setStateFromChild={setStateFromChild}
      />
    </div>
  );
}
