import React from 'react';

export default function User({ user: { displayName } }) {
  return (
    <div className="flex items-center mr-4 hidden sm:block">
      <span className="flex text-md ">
        <p className="font-bold">{displayName}</p>님 반갑습니다.
      </span>
    </div>
  );
}
