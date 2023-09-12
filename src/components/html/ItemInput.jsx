export const ItemInput = ({ item, updateItemValue, idx }) => {
   return (
    <>
      <div className="mr-2">
        <p className='ml-1'>내 역</p>
        <input
          type="text"
          placeholder=" 내역 입력"
          className="border-b border-black"
          value={item.title}
          onChange={(e) => updateItemValue(idx, 'title', e.target.value)}
        />
      </div>
      <div className="mr-2">
        <p className='ml-1'>금 액</p>
        <input
          type="text"
          placeholder=" 금액 입력"
          className="border-b border-black"
          value={item.amount}
          onChange={(e) => updateItemValue(idx, 'amount', e.target.value)}

        />
      </div>
      <div>
        <p className='ml-1'>비 고</p>
        <input
          type="text"
          placeholder=" 비고 입력"
          className="border-b border-black"
          value={item.note}
          onChange={(e) => updateItemValue(idx, 'note', e.target.value)}
        />
      </div>
    </>
  );
};
