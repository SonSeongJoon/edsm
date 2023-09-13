import React from 'react';
import {ItemInput} from "./html/ItemInput";


const ProductForm = ({ product, handleChange, addItem, removeItem, updateItemValue }) => {

	return (
		<div className="max-w-screen-2xl mx-auto border-b border-gray-300 p-5">
			<div className="container border-gray-500">
				<div className="flex header p-2">
					<div className="flex mb-5">
						<div className="font-bold mr-3">제목</div>
						<input
							type="text"
							name="title"
							placeholder="제목입력"
							value={product.title}
							className="border-b border-black w-[300px]"
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="content p-2">
					<div className="font-bold">부서명</div>
					<input
						type="text"
						name="dept"
						placeholder="부서명 입력"
						value={product.dept}
						className="border-b border-black"
						onChange={handleChange}
					/>
					<div className="font-bold mt-5">거래처</div>
					<input
						type="text"
						name="deel"
						value={product.deel}
						placeholder="거래처 입력"
						className="border-b border-black mb-5"
						onChange={handleChange}
					/>
					<div className="mt-5">
						<div className="font-bold">내역</div>
						{product.items.map((item, idx) => (
							<div key={idx} className="flex items-center">
								<ItemInput item={item} updateItemValue={updateItemValue} idx={idx} />
								{idx === product.items.length - 1 && (
									<button
										className="bg-brand px-2 py-1 text-white text-sm rounded-md mr-1 mt-3"
										onClick={() => addItem()}
									>
										항목 추가
									</button>
								)}
								{idx !== 0 && idx === product.items.length - 1 && (
									<button
										className="bg-brand px-2 py-1 text-white text-sm rounded-md mt-3"
										onClick={() => removeItem(idx)}
									>
										삭제
									</button>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductForm;
