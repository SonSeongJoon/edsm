import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {getAllDataForUser} from "../../api/firebase";
import {useAuthContext} from "../../context/AuthContext";

// 초기 폼 데이터 설정
const initVacationForm = {
	file           : '휴가계',
	title          : '',
	AttributionYear: moment().format('YYYY'), // 현재 연도
	TotalLeaveDays : '',
	UsedDays       : '',
	RemainDays     : '',
	Vacations      : [
		{
			startDate     : '',
			endDate       : '',
			vacationReason: '',
			daysDifference: '',
			isHalfDay     : false, // 반차 상태 정보 추가
		},
	],
	agree          : [],
	agreeName      : [],
	agreeUid: [],
};

const VacationForm = ({product, handleChange}) => {
	const [vacations, setVacations] = useState(product?.Vacations || initVacationForm.Vacations);
	const {user} = useAuthContext();

	const addVacationPeriod = () => {
		if(product.Vacations?.length < 3) {
			setVacations((prev) => [
				...prev,
				{
					startDate     : '',
					endDate       : '',
					daysDifference: '',
					vacationReason: '',
					isHalfDay     : false,
				},
			]);
		} else {
			alert('최대 3개의 휴가만 추가할 수 있습니다.');
		}
	};
	// 휴가 기간 항목 제거
	const removeVacationPeriod = (index) => {
		setVacations((prev) => prev.filter((_, idx) => idx !== index));
	};

	const handleVacationChange = (index, field, value) => {
		const newVacations = [...vacations];
		newVacations[index][field] = value;

		if(field === 'startDate' || field === 'endDate') {
			const startDate = field === 'startDate' ? value : newVacations[index].startDate;
			const endDate = field === 'endDate' ? value : newVacations[index].endDate;

			if(startDate && endDate) {
				const start = moment(startDate);
				const end = moment(endDate);
				const diff = end.diff(start, 'days') + 1;
				newVacations[index].daysDifference = diff.toString();
			}
		}

		setVacations(newVacations);
		handleChange({target: {name: 'Vacations', value: newVacations}});
	};

	const toggleHalfDay = (index) => {
		const newVacations = [...vacations];
		if(newVacations[index].daysDifference === '1' || newVacations[index].daysDifference === '0.5') {
			const newDiff = newVacations[index].isHalfDay ? '1' : '0.5';
			newVacations[index].isHalfDay = !newVacations[index].isHalfDay;
			newVacations[index].daysDifference = newDiff;
			setVacations(newVacations);
			handleChange({target: {name: 'Vacations', value: newVacations}});
		}
	};
  async function fetchUsedDays(userId) {
    try {
      const usedDays = await getAllDataForUser(userId);
      return parseFloat(usedDays) || 0.0;
    } catch (error) {
      // Handle error if needed
      console.error('Error fetching UsedDays:', error);
      return 0.0;
    }
  }

  useEffect(() => {
    const totalLeaveDays = parseFloat(product.TotalLeaveDays) || 0.0;
    const usedDays = parseFloat(product.UsedDays) || 0.0;
    const remainDays = totalLeaveDays - usedDays;

    handleChange({
      target: { name: 'RemainDays', value: remainDays.toFixed(1) },
    });
  }, [handleChange, product.TotalLeaveDays, product.UsedDays]);


  useEffect(() => {
		handleChange({target: {name: 'Vacations', value: vacations}});
	}, [vacations, handleChange]);

  useEffect(() => {
    // Set the initial value of UsedDays based on the result of fetchUsedDays
    async function initializeUsedDays() {
      const usedDays = await fetchUsedDays(user.uid);
      handleChange({ target: { name: 'UsedDays', value: usedDays.toString() } });
    }

    initializeUsedDays();
  }, [user.uid, handleChange]);

	return (
		<div className='max-w-screen-lg mx-auto'>
			<div className='container bg-white p-2'>
				<div className='mb-3'>
					<label className='block sm:text-md text-xm font-bold mb-2' htmlFor='title'>
						제목:
					</label>
					<input
						type='text'
						name='title'
						id='title'
						placeholder='제목 입력'
						value={product.title || ''}
						className='w-[250px] px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
						onChange={handleChange}
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-5'>
					<div>
						<label className='block sm:text-md text-xm font-bold mb-2' htmlFor='AttributionYear'>
							귀속연도:
						</label>
						<input
							type='number'
							name='AttributionYear'
							id='AttributionYear'
							placeholder='귀속연도 입력'
							value={product.AttributionYear || ''}
							className='w-[250px] px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='flex space-x-2 sm:space-x-2'>
					<div>
						<label className='font-bold sm:text-md text-xm mr-2' htmlFor='TotalLeaveDays'>
							총 연차일수
						</label>
						<input
							type='text'
							pattern='\d*\.?\d*' // allows numbers and a single decimal point
							name='TotalLeaveDays'
							id='TotalLeaveDays'
							value={product.TotalLeaveDays || ''}
							className='w-20 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
							onChange={handleChange}
						/>
					</div>
					<div>
						<label className='font-bold sm:text-md text-xm mr-2' htmlFor='UsedDays'>
							기사용일수
						</label>
						<input
							type='text'
							pattern='\d*\.?\d*' // allows numbers and a single decimal point
							name='UsedDays'
							id='UsedDays'
							value={product.UsedDays || ''}
							className='w-20 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
							onChange={handleChange}
						/>
					</div>
					<div>
						<label className='font-bold sm:text-md text-xm mr-2' htmlFor='RemainDays'>
							잔여일수
						</label>
						<input
							type='text'
							name='RemainDays'
							id='RemainDays'
							value={product.RemainDays || ''}
							readOnly={true}
							className='w-20 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className='mt-5'>
					{product?.Vacations &&
						product.Vacations.map((vacation, index) => (
							<div key={index} className='mb-4 '>
								<div>
									<div className='flex-col border sm:p-5 p-2 rounded-lg shadow-lg text-xm sm:text-md'>
										<div className='flex space-x-2 items-center'>
											<div className='flex items-center'>
												<label className='font-bold sm:text-md text-xm mr-2' htmlFor={`startDate${index}`}>
													시작
												</label>
												<input
													type='date'
													name={`startDate${index}`}
													value={vacation.startDate}
													className='sm:px-3 sm:py-2 px-1 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
													onChange={(e) => handleVacationChange(index, 'startDate', e.target.value)}
												/>
											</div>
											<div className='flex items-center'>
												<label className='font-bold sm:text-md text-xm mr-2' htmlFor={`endDate${index}`}>
													종료
												</label>
												<input
													type='date'
													name={`endDate${index}`}
													value={vacation.endDate}
													className='sm:px-3 sm:py-2 px-1 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
													onChange={(e) => handleVacationChange(index, 'endDate', e.target.value)}
												/>
												<div className='px-2 py-1 rounded font-bold text-green-700 text-xm sm:text-sm'>
													{vacation.daysDifference} 일간
												</div>
											</div>
											<div>
												{(vacation.daysDifference === '1' || vacation.daysDifference === '0.5') && (
													<button
														onClick={() => toggleHalfDay(index)}
														className='ml-2 px-2 py-1 border rounded bg-gray-500 text-white text-xm'
													>
														{vacation.isHalfDay ? '취소' : '반차'}
													</button>
												)}
											</div>
										</div>
										<div className='mt-1 flex-col '>
											<div
												className='text-sky-500 text-xm sm:text-sm mb-2'>{vacation.isHalfDay ? '오전/오후 반차 표시를 제목에 작성해주세요!' : null}</div>
											<div className='flex items-center'>
												<label className='block sm:text-md text-xm font-bold mr-2'
												       htmlFor={`vacationReason${index}`}>
													휴가사유
												</label>
												<input
													type='text'
													name={`vacationReason${index}`}
													placeholder='휴가사유 입력'
													value={vacation.vacationReason}
													className='w-1/2 px-2 py-1 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
													onChange={(e) => handleVacationChange(index, 'vacationReason', e.target.value)}
												/>
											</div>
										</div>
									</div>
									<div className='mt-2 flex justify-end'>
										{index === product.Vacations.length - 1 && (
											<div>
												{index !== 0 && (
													<button
														onClick={() => removeVacationPeriod(index)}
														className='ml-2 px-3 py-1 border rounded bg-brand text-white text-xm'
													>
														삭제
													</button>
												)}
												<button
													onClick={addVacationPeriod}
													className='ml-2 px-3 py-1 border rounded bg-blue-600 text-white text-xm'
												>
													휴가 추가
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default VacationForm;
export {initVacationForm};
