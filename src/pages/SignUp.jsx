import React, { useState } from 'react';
import { signupEmail } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

const departments = [
  'IR 1본부',
  'IR 2본부',
  'PR 본부',
  '경영지원팀',
  '디자인영상부',
  '플랫폼사업부',
  'IR 파트너스',
  'IR인베스트먼트',
  '대표이사',
  '알바',
];
const roles = ['일반사원', '부서장&대표'];
const corporations = ['서울IR네트워크', '서울IR인베스트먼트', '서울IR파트너스'];

export default function SignUp() {
  const initialFormData = {
    name: '',
    email: '@seoulir.co.kr',
    phoneNum: '',
    password: '',
    department: 'IR 1본부',
    role: '일반사원',
    corporation: '서울IR네트워크',
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 필드가 채워져 있는지 확인
    for (let key in formData) {
      if (formData[key] === '' || formData[key] === null) {
        alert('모든 필드를 입력해주세요.');
        return; // 함수 종료
      }
    }

    try {
      await signupEmail(formData);
      alert('가입이 완료되었습니다!');
      console.log('User registered successfully.');
      setFormData(initialFormData); // <- 입력 폼을 초기 상태로 설정하는 부분
    } catch (error) {
      console.error('Error registering user:', error);
      // 사용자에게 오류 메시지 표시
      alert(`오류가 발생했습니다: ${error.message}`);
    }
  };


  const handleLogin = () => {
    navigate(`/login`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="이름"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
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
                className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="이메일 주소(@seoulir.ac.kr)"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNum" className="sr-only">
                핸드폰 번호
              </label>
              <input
                id="phoneNum"
                name="phoneNum"
                type="tel"
                required
                className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="핸드폰 번호 ex) 01012345678"
                value={formData.phoneNum}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="department"
                className="mt-5 block text-md font-medium text-gray-700"
              >
                부서명 선택
              </label>
              <select
                id="department"
                name="department"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={formData.department}
                onChange={handleChange}
              >
                {departments.map((department, idx) => (
                  <option key={idx} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="role"
                className="mt-5 block text-md font-medium text-gray-700"
              >
                권한 선택
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={formData.role}
                onChange={handleChange}
              >
                {roles.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="role"
                className="mt-5 block text-md font-medium text-gray-700"
              >
                법인 선택
              </label>
              <select
                id="corporation"
                name="corporation"
                className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={formData.corporation}
                onChange={handleChange}
              >
                {corporations.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}
            >
              가입 하기
            </button>
            <button
              className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleLogin}
            >
              로그인 화면으로 이동
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
