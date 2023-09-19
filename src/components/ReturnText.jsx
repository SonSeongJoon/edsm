import React, { useEffect, useState } from 'react';
import {
  getRejectReasonAdmin,
  removeRejectReason,
  setRejectReason,
} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function ReturnText({ product, onChildSubmit }) {
  const [reason, setReason] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const user = useAuthContext();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 반려 사유를 로드
    const fetchRejectReason = async () => {
      try {
        const loadedReason = await getRejectReasonAdmin(
          user.user.uid,
          product.id,
        );
        if (loadedReason) {
          setDisplayText(loadedReason);
          setIsSubmitted(true);
        } else {
          setIsSubmitted(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRejectReason();
  }, [onChildSubmit, product.id, user.user.displayName, user.user.uid]);

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      setDisplayText(reason);
      setReason('');
      onChildSubmit('loadedReason');
      setRejectReason(
        product.id,
        reason,
        user.user.displayName,
        user.user.uid,
      ).catch(console.error);
      setIsSubmitted(true);
    } else {
      setDisplayText('');
      setIsSubmitted(false);
      onChildSubmit(null);
      removeRejectReason(
        product.id,
        user.user.displayName,
        user.user.uid,
      ).catch(console.error);
    }
  };

  return (
    <div className="p-4 border shadow-lg rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">반려 사유 입력</h1>
        <button
          onClick={handleSubmit}
          className={`border py-2 px-4 rounded-lg text-white ${
            isSubmitted ? 'bg-brand' : 'bg-blue-500'
          }`}
        >
          {isSubmitted ? '삭제' : '등록'}
        </button>
      </div>
      <div className="flex flex-col">
        {!isSubmitted || reason ? (
          <textarea
            id="reason"
            name="reason"
            value={reason}
            onChange={handleChange}
            placeholder="반려 사유를 입력하세요"
            className="mt-1 p-2 w-full border rounded-md"
          />
        ) : (
          <p className="mt-1 p-2 w-full">{displayText}</p>
        )}
      </div>
    </div>
  );
}
