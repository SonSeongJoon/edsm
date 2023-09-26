export const ItemInput = ({ item, updateItemValue, idx }) => {
   return (
    <>
      <div className="mr-2">
        <p className='ml-1'>내 역</p>
        <input
          type="text"
          placeholder=" 내역 입력"
          className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={item.title}
          onChange={(e) => updateItemValue(idx, 'title', e.target.value)}
        />
      </div>
      <div className="mr-2">
        <p className='ml-1'>금 액</p>
        <input
          type="text"
          placeholder=" 금액 입력"
          className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={item.amount}
          onChange={(e) => updateItemValue(idx, 'amount', e.target.value)}

        />
      </div>
      <div>
        <p className='ml-1'>비 고</p>
        <input
          type="text"
          placeholder=" 비고 입력"
          className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={item.note}
          onChange={(e) => updateItemValue(idx, 'note', e.target.value)}
        />
      </div>
    </>
  );
};
