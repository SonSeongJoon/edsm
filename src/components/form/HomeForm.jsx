import React, { useEffect } from 'react';
import { HomeItemInput } from '../html/HomeItemInput';

const initHomeForm = {
	file: '재택근무신청서',
	title: '',
	dept: '',
	deel: '',
	items: [{ title: '', amount: '' }],
	agree: [],
	agreeName: [],
	agreeUid: [],
	workPlace: '',
	workDate: '', // 문자열로 변경
	workTimeStart: '',
	workTimeEnd: '',
	workTime: '', // workTime 추가
	workHow: '',
};

const HomeForm = ({ product, setProduct, handleChange }) => {
	useEffect(() => {
		setProduct((prevProduct) => ({
			...prevProduct,
			items: [{ title: '', amount: '' }],
		}));
	}, [product.file, setProduct]);

	const addItem = () => {
		if (product.items.length < 8) {
			setProduct((prevProduct) => ({
				...prevProduct,
				items: [...prevProduct.items, { title: '', amount: '' }],
			}));
		} else {
			alert('최대 8개의 항목만 추가할 수 있습니다.');
		}
	};

	const removeItem = (indexToRemove) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			items: prevProduct.items.filter((_, idx) => idx !== indexToRemove),
		}));
	};

	const updateItemValue = (idx, key, value) => {
		setProduct((prevProduct) => {
			const newItems = [...prevProduct.items];

			if (key === 'amount') {
				const nonNumericParts = value.split(/[\d,]+/);
				const numbersWithCommas = value.match(/[\d,]+/g);
				let result = value;

				if (numbersWithCommas) {
					const formattedNumbers = numbersWithCommas.map((numStr) => {
						const numberWithoutCommas = numStr.replace(/,/g, '');
						return parseInt(numberWithoutCommas).toLocaleString('en-US');
					});

					result = '';
					for (let i = 0; i < nonNumericParts.length; i++) {
						result += nonNumericParts[i];
						if (i < formattedNumbers.length) {
							result += formattedNumbers[i];
						}
					}
				}

				newItems[idx] = { ...newItems[idx], [key]: result }; // 포맷된 값을 사용합니다.
			} else {
				newItems[idx] = { ...newItems[idx], [key]: value }; // 다른 필드는 원래의 로직을 그대로 사용합니다.
			}

			return {
				...prevProduct,
				items: newItems,
			};
		});
	};

	const handleWorkTimeStartChange = (e) => {
		const value = e.target.value;
		setProduct((prevProduct) => ({
			...prevProduct,
			workTimeStart: value,
			workTime: `${value} ~ ${prevProduct.workTimeEnd}`,
		}));
	};

	const handleWorkTimeEndChange = (e) => {
		const value = e.target.value;
		setProduct((prevProduct) => ({
			...prevProduct,
			workTimeEnd: value,
			workTime: `${prevProduct.workTimeStart} ~ ${value}`,
		}));
	};

	return (
		<div className="max-w-screen-2xl mx-auto">
			<div className="container border-gray-500">
				<div className="header p-2 sm:flex-col md:flex-row">
					<div className="font-bold">제목</div>
					<input
						type="text"
						name="title"
						placeholder="제목입력"
						value={product.title || ''}
						className="mt-2 w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						onChange={handleChange}
					/>
				</div>
				<div className="content p-2 mt-2">
					<div className="font-bold">근무 개요</div>
					<div className="container text-sm">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<div className="mt-2">근무 날짜</div>
								<input
									type="date" // input 요소의 type을 'date'로 변경
									name="workDate"
									value={product.workDate || ''}
									placeholder="근무 날짜 입력"
									className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
									onChange={handleChange}
								/>
							</div>
							<div>
								<div className=" mt-2">근무 장소</div>
								<input
									type="text"
									name="workPlace"
									value={product.workPlace || ''}
									placeholder="예시) 자택"
									className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="gap-4">
							<div>
								<div className=" mt-2">근무 시간</div>
								<div className="grid grid-cols-3 gap-4 items-center">
									<input
										type="time"
										name="workTimeStart"
										value={product.workTimeStart || ''}
										placeholder="예시) 08:30"
										className="col-span-1 w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
										onChange={handleWorkTimeStartChange}
									/>
									<span className="font-bold col-span-1 text-center">~</span>
									<input
										type="time"
										name="workTimeEnd"
										value={product.workTimeEnd || ''}
										placeholder="예시) 17:30"
										className="col-span-1 w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
										onChange={handleWorkTimeEndChange}
									/>
								</div>
							</div>


							<div>
								<div className=" mt-2">근무 방법</div>
								<input
									type="text"
									name="workHow"
									value={product.workHow || ''}
									placeholder="예시) 회사 PC 사용"
									className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
					<div className="mt-5 items-center">
						<div className="flex flex-col font-bold w-full ">근무 내용(사전계획)</div>
						{product.items.map((item, idx) => (
							<>
								<div
									key={idx}
									className="flex flex-col sm:flex-row sm:items-center w-full"
								>
									<HomeItemInput
										item={item}
										updateItemValue={updateItemValue}
										idx={idx}
									/>
								</div>
								<div className="flex items-center">
									{idx === product.items.length - 1 && (
										<div className="flex items-center mt-2 mb-4">
											<button
												className="bg-brand px-2 py-1 text-white text-sm rounded-md flex-shrink-0 mr-2"
												onClick={() => addItem()}
											>
												추가
											</button>
											{idx !== 0 && (
												<button
													className="bg-brand px-2 py-1 text-white text-sm rounded-md flex-shrink-0"
													onClick={() => removeItem(idx)}
												>
													삭제
												</button>
											)}
										</div>
									)}
								</div>
							</>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export { HomeForm, initHomeForm };
