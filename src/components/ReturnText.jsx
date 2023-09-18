import React, { useState } from 'react';
import {removeRejectReason, setRejectReason} from "../api/firebase";
import {useAuthContext} from "../context/AuthContext";

export default function ReturnText({product}) {
  const [reason, setReason] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const user = useAuthContext();
  const handleChange = (e) => {
    setReason(e.target.value);
  };


  const handleSubmit = () => {
    if (!isSubmitted) {
      setDisplayText(reason);
      setReason('');
      setRejectReason(product.id, reason, user.user.displayName).catch(console.error);
      setIsSubmitted(true);
    } else {
      setDisplayText('');
      setIsSubmitted(false);
      removeRejectReason(product.id, user.user.displayName).catch(console.error);

    }
  };

  return (
     <div className="mt-3 p-4 border shadow-lg rounded-lg">
       <h1 className="text-xl font-bold mb-4">반려 사유 입력</h1>
       <div className="flex mb-2 items-center justify-between">
         {!isSubmitted ? (
            <textarea
               id="reason"
               name="reason"
               value={reason}
               onChange={handleChange}
               placeholder="반려 사유를 입력하세요"
               className="mt-1 p-2 w-5/6 border rounded-md"
            />
         ) : (
            <p className="mt-1 p-2 w-5/6">{displayText}</p>
         )}
         <button
            onClick={handleSubmit}
            className={`border py-2 px-4 rounded-lg text-white ${isSubmitted ? 'bg-brand' : 'bg-blue-500'}`}
         >
           {isSubmitted ? '삭제' : '등록'}
         </button>
       </div>
     </div>
  );
}
