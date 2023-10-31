import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthContext} from '../context/AuthContext';
import {addNewProduct, handleMultipleFilesUpload} from '../api/firebase';
import {expenditure} from '../components/html/Transhtml/Expenditure';
import {vacationPlan} from '../components/html/Transhtml/VacationPlan';
import {ExpendForm, initExpendForm} from '../components/form/ExpendForm';
import VacationForm, {initVacationForm,} from '../components/form/VacationForm';
import {htmlToFile} from '../js/convertToWord.js';
import moment from 'moment';
import {ApprovalForm, initApprovalForm,} from '../components/form/ApprovalForm';
import {approvalDocument} from '../components/html/Transhtml/approvalDocument';
import {initOvertimeForm, OvertimeForm,} from '../components/form/OvertimeForm';
import {AlternativeForm, initAlternativeForm,} from '../components/form/AlternativeForm';
import {initReportGiftForm, ReporterGiftForm,} from '../components/form/ReporterGiftForm';
import {initTravelForm, TravelExpensesForm,} from '../components/form/TravelExpensesForm';
import {CustomerForm, initCustomerForm,} from '../components/form/CustomerForm';
import {ReporterGift} from '../components/html/Transhtml/ReporterGift';
import {TravelExpenses} from '../components/html/Transhtml/TravelExpenses';
import {Customer} from '../components/html/Transhtml/Customer';
import {Overtime} from '../components/html/Transhtml/Overtime';
import {Alternative} from '../components/html/Transhtml/Alternative';

const options = [
	'지출결의서',
	'휴가계',
	'품의서',
	'초과근무사전품의서',
	'대체휴무사용품의서',
	'기자선물품의서',
	'출장비정산서',
	'고객사실비청구서',
];
const initForms = {
	지출결의서    : initExpendForm,
	휴가계      : initVacationForm,
	품의서      : initApprovalForm,
	초과근무사전품의서: initOvertimeForm,
	대체휴무사용품의서: initAlternativeForm,
	기자선물품의서  : initReportGiftForm,
	출장비정산서   : initTravelForm,
	고객사실비청구서 : initCustomerForm,
};
const Forms = {
	지출결의서    : ExpendForm,
	휴가계      : VacationForm,
	품의서      : ApprovalForm,
	초과근무사전품의서: OvertimeForm,
	대체휴무사용품의서: AlternativeForm,
	기자선물품의서  : ReporterGiftForm,
	출장비정산서   : TravelExpensesForm,
	고객사실비청구서 : CustomerForm,
};
const approvers = [
	{name: '서민아 이사', email: 'minah_seo@seoulir.co.kr'},
	{name: '송원식 상무이사', email: 'wssong5790@seoulir.co.kr'},
	{name: '송현길 이사', email: 'lesson201@seoulir.co.kr'},
	{name: '권미경 책임', email: 'seoulir@seoulir.co.kr'},
	{name: '김연재 수석매니저', email: 'sigguruwa@seoulir.co.kr'},
	{name: '김성준 매니저', email: 'brian9292@seoulir.co.kr'},
	{name: '한현석 대표이사', email: 'hshan@seoulir.co.kr'},
	{name: '개발자', email: 'sonsj96@seoulir.co.kr'},
];
export default function Write() {
	const navigator = useNavigate();
	const user = useAuthContext();
	const userName = user.user.displayName;
	const userDept = user.user.dept;
	const userPhoneNum = user.user.phoneNum;
	const userCorporation = user.user.corporation;
	const currentDate = moment().format('YYYY-MM-DD');
	const [files, setFiles] = useState([]);
	const [product, setProduct] = useState({
		...initExpendForm,
		date       : currentDate,
		dept       : userDept,
		name       : userName,
		phoneNum   : userPhoneNum,
		corporation: userCorporation,
	});

	useEffect(() => {
		setProduct((prevProduct) => ({
			...(initForms[product.file] || initExpendForm),
			items      : initForms[product.file]?.items || [],
			date       : prevProduct.date,
			dept       : prevProduct.dept,
			name       : prevProduct.name,
			phoneNum   : prevProduct.phoneNum,
			corporation: prevProduct.corporation,
		}));
	}, [product.file]);

	const handleSubmit = async () => {
		if(product.agree.length === 0) {
			alert('결재요청자를 선택하세요.');
			return;
		}
		let downloadURL;

		if(files.length > 0) {
			try {
				downloadURL = await handleMultipleFilesUpload(files); // 파일 배열 전체를 전달합니다.
			} catch (error) {
				console.error('Error uploading files:', error);
				return;
			}
		}

		try {
			await addNewProduct(
				product,
				userName,
				userDept,
				userPhoneNum,
				userCorporation,
				downloadURL,
			);

			alert('등록 되었습니다.');
			setProduct(initForms[product.file] || initExpendForm);
			navigator(`/wait`);
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};

	const handleAgreeChange = (e) => {
		const {name, checked} = e.target;
		const approver = approvers.find((approver) => approver.name === name);

		setProduct((prevProduct) => {
			if(checked) {
				return {
					...prevProduct,
					agree    : [...prevProduct.agree, approver.email],
					agreeName: [...prevProduct.agreeName, approver.name],
				};
			} else {
				return {
					...prevProduct,
					agree    : prevProduct.agree.filter((email) => email !== approver.email),
					agreeName: prevProduct.agreeName.filter(
						(approverName) => approverName !== approver.name,
					),
				};
			}
		});
	};

	const handleChange = useCallback(
		(e) => {
			const {name, value} = e.target;

			if(name === 'price') {
				const nonNumericParts = value.split(/[\d,]+/).filter(Boolean);
				const numbersWithCommas = value.split(/[^\d,]+/).filter(Boolean);

				// 숫자가 포함된 경우에만 처리
				if(numbersWithCommas.length) {
					const formattedNumbers = numbersWithCommas.map((numStr) =>
						parseInt(numStr.replace(/,/g, '')).toLocaleString('en-US'),
					);

					let result = '';
					let nonNumericIndex = 0;
					let numericIndex = 0;

					for (let i = 0; i < value.length; i++) {
						if(/\d/.test(value[i])) {
							if(numericIndex < formattedNumbers.length) {
								result += formattedNumbers[numericIndex++];
								i += numbersWithCommas[numericIndex - 1].length - 1;
							}
						} else {
							if(nonNumericIndex < nonNumericParts.length) {
								result += nonNumericParts[nonNumericIndex++];
								i += nonNumericParts[nonNumericIndex - 1]?.length - 1 || 0;
							}
						}
					}

					setProduct((prevProduct) => ({
						...prevProduct,
						[name]: result,
					}));
				} else {
					setProduct((prevProduct) => ({...prevProduct, [name]: value}));
				}
			} else {
				setProduct((prevProduct) => ({...prevProduct, [name]: value}));
			}
		},
		[setProduct],
	);

	const FormComponent = Forms[product.file] || ExpendForm;
	const buttons = [
		{
			onClick  : handleSubmit,
			text     : '등록하기',
			className: 'bg-brand hover:bg-brand-dark focus:ring-brand-lighter',
		},
		{
			onClick  : () => {
				if(product.file === '지출결의서') {
					const htmlString = expenditure(product);
					htmlToFile(htmlString, 'doc');
				} else if(product.file === '휴가계') {
					const htmlString = vacationPlan(product);
					htmlToFile(htmlString, 'doc');
				} else if(product.file === '품의서') {
					const htmlString = approvalDocument(product);
					htmlToFile(htmlString, 'doc');
				} else if(product.file === '초과근무사전품의서') {
					const htmlString = Overtime(product);
					htmlToFile(htmlString, 'doc');
				} else if(product.file === '대체휴무사용품의서') {
					const htmlString = Alternative(product);
					htmlToFile(htmlString, 'doc');
				} else if(product.file === '기자선물품의서') {
					const htmlString = ReporterGift(product);
					htmlToFile(htmlString, 'doc');
				} else if(product.file === '출장비정산서') {
					const htmlString = TravelExpenses(product);
					htmlToFile(htmlString, 'doc');
				} else if(product.file === '고객사실비청구서') {
					const htmlString = Customer(product);
					htmlToFile(htmlString, 'doc');
				}
			},
			text     : '인 쇄',
			className: 'bg-blue-800 hover:bg-blue-900 focus:ring-blue-300',
		},
	];

	return (
		<>
			<div
				className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto p-4 items-start mb-8 space-y-4 lg:space-y-0 lg:space-x-4">
				{/* Left Side */}
				<div className="w-full lg:w-3/4 flex-2">
					<div className="font-semibold text-2xl md:text-3xl text-brand mb-4">
						품의서 작성하기
					</div>
					<div className="flex items-center mb-4">
						<p className="text-base md:text-lg mr-3">* 양식 선택</p>
						<select
							id="select"
							name="file"
							className="ml-3 border border-red-500 p-2 rounded focus:outline-none focus:border-brand"
							value={product.file}
							onChange={handleChange}
						>
							{options &&
								options.map((option, index) => (
									<option key={index}>{option}</option>
								))}
						</select>
					</div>
					<FormComponent
						product={product}
						setProduct={setProduct}
						handleChange={handleChange}
						userDept={userDept}
					/>
				</div>
				{/* Right Side */}
				<div className="w-full lg:w-1/4 flex-1 bg-gray-100 p-2 md:p-4 rounded">
					<div className="font-bold text-lg md:text-xl mb-3">
						결재 승인 요청
					</div>
					{approvers.map((approver) => (
						<label
							key={approver.name}
							className="flex items-center space-x-2 mt-2 hover:bg-gray-200 p-2 rounded transition duration-150 ease-in-out cursor-pointer"
						>
							<input
								type="checkbox"
								name={approver.name}
								onChange={handleAgreeChange}
								className="form-checkbox text-brand border-gray-300 rounded focus:border-brand focus:ring focus:ring-offset-0 focus:ring-brand focus:ring-opacity-50"
								checked={product.agree.includes(approver.email)}
							/>
							<span className="text-sm md:text-base text-gray-700">
                {approver.name}
              </span>
						</label>
					))}
					<p className="mt-5 text-xm text-gray-500">
						다중 선택 시, 동일한 위치에서 "ctrl" 버튼을 누른 상태에서 클릭
					</p>
					<input
						className="text-xm"
						type="file"
						multiple
						onChange={(e) => {
							const filesArray = Array.from(e.target.files);
							setFiles(filesArray);
						}}
					/>

					<div className="flex">
						<div
							className="mt-5 flex flex-col lg:flex-row w-full justify-center space-y-2 lg:space-y-0 lg:space-x-2">
							{buttons.map((btn, idx) => (
								<button
									key={idx}
									onClick={btn.onClick}
									className={`${btn.className} text-white px-2 md:px-4 py-1 md:py-2 rounded focus:outline-none focus:ring transition duration-150 ease-in-out shadow-md`}
								>
									{btn.text}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
