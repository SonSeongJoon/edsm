import React from 'react';
import {ItemInput} from "./html/ItemInput";


const ProductForm = ({ product, handleChange, addItem, removeItem, updateItemValue }) => {

	return (
		<div className="max-w-screen-2xl mx-auto p-5">
			<div className="container border-gray-500 sm:p-2 md:p-5">
				<div className="flex header p-2 sm:flex-col md:flex-row">
					<div className="font-bold mr-3 mb-2 sm:mb-3 md:mb-0">제목</div>
					<input
						type="text"
						name="title"
						placeholder="제목입력"
						value={product.title}
						className="border-b border-black w-full sm:w-3/4 md:w-[300px]"
						onChange={handleChange}
					/>
				</div>
				<div className="content p-2">
					<div className="font-bold mt-5">부서명</div>
					<input
						type="text"
						name="dept"
						placeholder="부서명 입력"
						value={product.dept}
						className="border-b border-black w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
						onChange={handleChange}
					/>
					<div className="font-bold mt-5">거래처</div>
					<input
						type="text"
						name="deel"
						value={product.deel}
						placeholder="거래처 입력"
						className="border-b border-black w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mb-5"
						onChange={handleChange}
					/>
					<div className="mt-5">
						<div className="font-bold">내역</div>
						{product.items.map((item, idx) => (
							<div key={idx} className="flex flex-col md:flex-row items-center">
								<ItemInput item={item} updateItemValue={updateItemValue} idx={idx} />
								<div className="flex space-x-3 mt-3">
									<button
										className="bg-brand px-2 py-1 text-white text-sm rounded-md"
										onClick={() => addItem()}
									>
										항목 추가
									</button>
									{idx !== 0 && idx === product.items.length - 1 && (
										<button
											className="bg-brand px-2 py-1 text-white text-sm rounded-md"
											onClick={() => removeItem(idx)}
										>
											삭제
										</button>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductForm;