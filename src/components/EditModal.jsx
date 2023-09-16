import {ItemModify} from "./html/ItemModify";

export function EditModal({
	                          modalProduct,
	                          handleEditChange,
	                          handleItemValue,
	                          handleSave,
	                          closeEditModal
                          }) {
	return (
		<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center sm:text-md text-xm">
			<div className="bg-white p-5 rounded shadow-lg w-[800px] border border-gray-500 max-h-[500px] overflow-y-auto">
				<h1 className='text-3xl font-bold mb-5'>수정하기</h1>
				<div className="flex items-center mb-2">
					<h1 className="font-bold mr-2 mb-1">제&nbsp;&nbsp;&nbsp;&nbsp;목 : </h1>
					<input
						name="title"
						value={modalProduct.title}
						onChange={handleEditChange}
						className="border border-gray-500 p-1 rounded-md shadow-md"
					/>
				</div>
				<div className="flex items-center mb-2">
					<h1 className="font-bold mr-2 mb-1">부서명 : </h1>
					<input
						name="dept"
						value={modalProduct.dept}
						onChange={handleEditChange}
						className="border border-gray-500 p-1 rounded-md shadow-md"
					/>
				</div>
				<div className="flex items-center">
					<h1 className="font-bold mr-2 mb-1">거래처 : </h1>
					<input
						name="deel"
						value={modalProduct.deel}
						onChange={handleEditChange}
						className="border border-gray-500 p-1 rounded-md shadow-md"
					/>
				</div>
				{modalProduct.items.map((item, idx) => (
					<div key={idx} className="flex items-center mt-5">
						<ItemModify item={item} idx={idx + 1} handleItemValue={handleItemValue} />
					</div>
				))}
				<div className="flex w-full justify-center mt-5">
					<button className="border px-2 py-1 rounded-md bg-gray-100 mr-2" onClick={handleSave}>
						저장
					</button>
					<button className="border px-2 py-1 rounded-md bg-gray-100" onClick={closeEditModal}>
						닫기
					</button>
				</div>
			</div>
		</div>
	);
}
