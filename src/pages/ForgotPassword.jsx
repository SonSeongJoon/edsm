import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {isUserValid, resetPassword} from '../api/firebase';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [name, setName] = useState(''); // 이름을 저장할 state 추가
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const isValid = await isUserValid(email, name);
			if (!isValid) {
				alert('이름 또는 이메일 주소가 올바르지 않습니다.');
				return;
			}

			await resetPassword(email);
			alert('비밀번호 재설정 이메일이 발송되었습니다. 이메일을 확인해주세요.');
			navigate('/login');
		} catch (error) {
			alert(`${error.message}`);
		}
	};


	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">비밀번호 찾기</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								이메일 주소
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="가입한 이메일 주소 입력"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<div>
								<label htmlFor="name" className="sr-only">
									이름
								</label>
								<input
									id="name"
									name="name"
									type="text"
									required
									className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="이름 입력"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							비밀번호 재설정 이메일 보내기
						</button>
						<button
							type="button"
							className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={() => navigate('/login')}
						>
							로그인하기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
