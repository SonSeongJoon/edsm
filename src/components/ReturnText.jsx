import React, { useState } from 'react';

export default function ReturnText() {
  const [reason, setReason] = useState('');
  const [displayText, setDisplayText] = useState('');  // Store the text to be displayed as a paragraph
  const [isSubmitted, setIsSubmitted] = useState(false);  // Determine whether the text has been submitted

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      setDisplayText(reason);  // Store the input value as the display text
      setReason('');  // Clear the input
      setIsSubmitted(true);  // Mark as submitted
    } else {
      setDisplayText('');  // Clear the display text
      setIsSubmitted(false);  // Reset the submission state
    }
  };

  return (
     <div className="mt-3 p-4 border shadow-lg rounded-lg">
       <h1 className="text-xl font-bold mb-4">반려 사유 입력</h1>
       <div className="flex mb-2 items-center justify-between">
         {!isSubmitted ? (
            <input
               type="text"
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
            className={`border p-2 rounded-lg text-white ${isSubmitted ? 'bg-brand' : 'bg-blue-500'}`}
         >
           {isSubmitted ? '삭제' : '등록'}
         </button>
       </div>
     </div>
  );
}
