import { useEffect, useState } from 'react';
// d
export const ItemModify = ({ item, idx, handleItemValue }) => {
  const [localItem, setLocalItem] = useState(item);

  const handleInputChange = (e, name) => {
    const updatedItem = { ...localItem, [name]: e.target.value };
    setLocalItem(updatedItem);
  };

  useEffect(() => {
    return () => {
      handleItemValue(idx - 1, localItem);
    };
  }, [localItem]);

  return (
     <table className="w-full border-collapse border border-gray-300 mt-2 text-center">
       <thead>
       <tr>
         <th className="border border-gray-300 px-0.5 py-0.5">항 목</th>
         <th className="border border-gray-300 px-0.5 py-0.5">내 역</th>
         <th className="border border-gray-300 px-0.5 py-0.5">금 액</th>
         <th className="border border-gray-300 px-0.5 py-0.5">비 고</th>
       </tr>
       </thead>
       <tbody>
       <tr>
         <td className="border border-gray-300 px-0.5 py-0.5">{idx}항</td>
         <td className="border border-gray-300 px-0.5 py-0.5">
           <input
              type="text"
              value={localItem.title}
              onChange={(e) => handleInputChange(e, 'title')}
              className="border border-gray-500 p-0.5 rounded-md shadow-md"
           />
         </td>
         <td className="border border-gray-300 px-0.5 py-0.5">
           <input
              type="text"
              value={localItem.amount}
              onChange={(e) => handleInputChange(e, 'amount')}
              className="border border-gray-500 p-0.5 rounded-md shadow-md"
           />
         </td>
         <td className="border border-gray-300 px-0.5 py-0.5">
           <input
              type="text"
              value={localItem.note}
              onChange={(e) => handleInputChange(e, 'note')}
              className="border border-gray-500 p-0.5 rounded-md shadow-md"
           />
         </td>
       </tr>
       </tbody>
     </table>
  );
};
