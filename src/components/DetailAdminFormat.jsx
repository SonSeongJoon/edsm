import React, { useCallback, useEffect, useState } from 'react';
import {
  getAllOneState,
  getOneState,
  removeAdmit,
  setAdmit,
  setOneState,
  setState,
} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import ReturnText from './ReturnText';
import ExpenditureShow from './html/Show/ExpenditureShow';
import { VacationShow } from './html/Show/VacationShow';
import ApprovalShow from './html/Show/approvalShow';
import { sendKakaoAgreeProduct } from '../api/kakao';
import { OvertimeShow } from './html/Show/OvertimeShow';
import { useParams } from 'react-router-dom';

const STATE_APPROVED = '승인';
const STATE_PENDING = '대기';
const STATE_REJECTED = '반려';

const COMPONENT_MAP = {
  지출결의서: ExpenditureShow,
  휴가계: VacationShow,
  품의서: ApprovalShow,
  초과근무사전품의서: OvertimeShow,
};

export default function DetailAdminFormat({
  displayProduct,
  product,
  navigate,
  states,
}) {
  const user = useAuthContext();
  const uid = user?.user?.uid;
  const [data, setData] = useState('');
  const [isChildSubmitted, setIsChildSubmitted] = useState(false);
  const [state, setStates] = useState(states);
  const fetchInitialState = useCallback(async () => {
    try {
      const initialState = await getOneState(uid, product.id);
      setData(initialState);
    } catch (error) {
      console.error('Error fetching initial state: ', error);
    }
  }, [uid, product.id]);

  useEffect(() => {
    fetchInitialState();
  }, [fetchInitialState]);

  const { path } = useParams();

  const determineState = useCallback(
    (state) => {
      if (!state || state.length === 0) return STATE_PENDING;
      if (state.includes(STATE_REJECTED)) {
        sendKakaoAgreeProduct(product, (state = '반려'));
        return STATE_REJECTED;
      }
      if (state.includes(STATE_PENDING)) return STATE_PENDING;

      if (state.every((value) => value === STATE_APPROVED)) {
        sendKakaoAgreeProduct(product, (state = '승인'));
        return STATE_APPROVED;
      }

      return '알 수 없음';
    },
    [product],
  );

  const handleAdmitAction = useCallback(
    async (actionState) => {
      try {
        if (data === STATE_REJECTED && isChildSubmitted) {
          alert('사유를 먼저 삭제하세요');
          return;
        }

        const updatedState = await setOneState(uid, product.id, actionState);

        // Check if the returned state indicates it's already selected
        if (updatedState === actionState && data === updatedState) {
          alert('이미 선택된 상태입니다.'); // Optional alert to notify the user
          return; // Exit the function
        }

        setData(updatedState);

        if (updatedState === STATE_APPROVED) {
          await setAdmit(product.id, user.user.displayName);
        } else {
          await removeAdmit(product.id, user.user.displayName);
        }

        const allState = await getAllOneState(product.id);
        const updatedStates = allState
          .filter((stateItem) => stateItem.id === product.id)
          .map((stateItem) => ({
            name: stateItem.name,
            state: stateItem.state,
          }));
        setStates(updatedStates);

        const resultState = determineState(
          updatedStates.map((stateItem) => stateItem.state),
        );
        await setState(product.id, resultState);
      } catch (error) {
        console.error('Error handling admit: ', error);
      }
    },
    [
      data,
      isChildSubmitted,
      uid,
      product.id,
      determineState,
      user.user.displayName,
    ],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allStateData = await getAllOneState(product.id);
        const updatedStates = allStateData
          .filter((stateItem) => stateItem.id === product.id)
          .map((stateItem) => ({
            name: stateItem.name,
            state: stateItem.state,
          }));
        setStates(updatedStates);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [product.id]);

  const SpecificComponent = COMPONENT_MAP[displayProduct.file] || (() => null);

  return (
    <div className="w-full p-5 lg:flex">
      <div className="w-full">
        <div className="container mx-auto p-5 md:p-5 lg:p-8 shadow-lg rounded-lg bg-white border border-gray-200 flex flex-col justify-between">
          <div>
            <p className="flex items-center mb-3 sm:text-md text-sm">
              현재 해당 결재를 &nbsp;
              <span
                className={` text-white py-1 px-1.5 rounded-md ${
                  data === STATE_APPROVED
                    ? 'bg-emerald-600'
                    : data === STATE_PENDING
                    ? 'bg-gray-600'
                    : 'bg-red-800'
                }`}
              >
                {data}
              </span>
              &nbsp;하신 상태입니다!
            </p>
            <SpecificComponent product={displayProduct} />
            <div className="mt-5 mb-3 text-sm">
              <span className="font-bold">수신자:</span>
              {state?.map((stateItem, index) => (
                <span key={stateItem.name} className="ml-2">
                  {stateItem.name}{' '}
                  <span
                    className={`font-bold ${
                      stateItem.state === STATE_APPROVED
                        ? 'text-green-600'
                        : stateItem.state === STATE_REJECTED
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    ({stateItem.state})
                  </span>
                  {index !== state.length - 1 && ','}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-auto flex justify-end">
            {product.downloadURL && (
              <a
                href={product.downloadURL}
                download
                className="bg-gray-500 text-white px-2 py-1  text-sm rounded hover:bg-gray-700 ml-3"
              >
                첨부파일 다운로드
              </a>
            )}
          </div>
        </div>

        <div className="container mx-auto mt-10 flex w-full justify-end">
          <button
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate(`/${path}`);
              }
            }}
            className="px-4 py-2 rounded hover:bg-brand-dark border bg-gray-200 border-gray-300"
          >
            뒤로 가기
          </button>

          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded ml-2"
            onClick={() => handleAdmitAction(STATE_APPROVED)}
          >
            승인
          </button>

          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded ml-2"
            onClick={() => handleAdmitAction(STATE_PENDING)}
          >
            대기
          </button>

          <button
            className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded ml-2"
            onClick={() => handleAdmitAction(STATE_REJECTED)}
          >
            반려
          </button>
        </div>
      </div>
      <div className={`${data === STATE_REJECTED ? 'lg:w-1/3' : null}`}>
        <div className="flex justify-end w-full mt-3 lg:mt-0 lg:ml-3">
          {data === STATE_REJECTED ? (
            <ReturnText
              product={product}
              onAdmit={handleAdmitAction}
              onChildSubmit={setIsChildSubmitted}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
