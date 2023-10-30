import React, { useEffect, useState, useRef } from 'react'; // useRef를 import 합니다.

import { EditModal } from './EditModal';
import ReasonText from './ReasonText';
import ExpenditureShow from './html/Show/ExpenditureShow';
import {
  getRejectReasonProduct,
  handleFileDelete,
  handleMultipleFilesUpload,
  updateMstCheckInFirebase,
  updateProductDownloadURLs,
} from '../api/firebase';
import { VacationShow } from './html/Show/VacationShow';
import ApprovalShow from './html/Show/approvalShow';
import { OvertimeShow } from './html/Show/OvertimeShow';
import { useParams } from 'react-router-dom';
import { AlternativeShow } from './html/Show/AlternativeShow';
import ReporterGiftShow from './html/Show/ReporterGiftShow';
import TravelExpensesShow from './html/Show/TravelExpensesShow';
import CustomerShow from './html/Show/CustomerShow';
import { htmlToFile } from '../js/convertToWord';

export default function DetailUserFormat({
  showEditModal,
  modalProduct,
  handleEditChange,
  handleItemValue,
  handleSave,
  closeEditModal,
  displayProduct,
  product,
  openEditModal,
  navigate,
  isMst,
  states,
  setModalProduct,
  handleDelete,
  htmlString,
}) {
  const [reasonText, setReasonText] = useState(null);
  const [files, setFiles] = useState(product.downloadURL || []);
  const [tempFiles, setTempFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [localMstCheck, setLocalMstCheck] = useState(product.mstCheck === '확인');
  const { path } = useParams();

  useEffect(() => {
    const fetchReason = async () => {
      const result = await getRejectReasonProduct(product.id);
      setReasonText(result);
    };

    fetchReason();
  }, [product.id]);
  // const allApproved = states?.every((stateItem) => stateItem.state === '승인');
  const oneApproved = states?.some((stateItem) => stateItem.state === '승인');

  const deleteFile = async (fileToDelete, index) => {
    try {
      await handleFileDelete(product.id, fileToDelete, index);

      const updatedFiles = files.filter(
        (file, fileIndex) => fileIndex !== index,
      );
      setFiles(updatedFiles);

      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error during file deletion:', error);
    }
  };

  const handleSubmit = async () => {

    if (tempFiles.length === 0) {
      alert('추가할 파일이 없습니다.');
      return;
    }
    const allFiles = [...files, ...tempFiles];
    try {
      const newDownloadURLs = await handleMultipleFilesUpload(allFiles);
      console.log(newDownloadURLs);

      const updatedDownloadURLs = await updateProductDownloadURLs(
        product.id,
        newDownloadURLs,
      );

      alert('파일이 성공적으로 추가되었습니다.');
      setFiles(updatedDownloadURLs);
      setModalProduct((prevProduct) => ({
        ...prevProduct,
        downloadURL: updatedDownloadURLs,
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('An error occurred while adding files:', error);
    }
  };

  const handleChecked = async (event) => {
    try {
      const newMstCheckValue = event.target.checked;
      setLocalMstCheck(newMstCheckValue);
      await updateMstCheckInFirebase(product.id, newMstCheckValue);
    } catch (error) {
      console.error('An error occurred while updating Firebase:', error);
    }
  };

  return (
    <div className="w-full xl:flex">
      {showEditModal && (
        <EditModal
          modalProduct={modalProduct}
          handleEditChange={handleEditChange}
          handleItemValue={handleItemValue}
          handleSave={handleSave}
          closeEditModal={closeEditModal}
          setModalProduct={setModalProduct}
        />
      )}
      <div className={`py-3 px-3 ${reasonText ? 'xl:w-4/6' : 'w-full'}`}>
        <div className="container mx-auto p-5 md:p-5 lg:p-8 shadow-lg rounded-lg bg-white border border-gray-200">
          {displayProduct.file === '지출결의서' ? (
            <ExpenditureShow product={displayProduct} />
          ) : displayProduct.file === '휴가계' ? (
            <VacationShow product={displayProduct} />
          ) : displayProduct.file === '품의서' ? (
            <ApprovalShow product={displayProduct} />
          ) : displayProduct.file === '초과근무사전품의서' ? (
            <OvertimeShow product={displayProduct} />
          ) : displayProduct.file === '대체휴무사용품의서' ? (
            <AlternativeShow product={displayProduct} />
          ) : displayProduct.file === '기자선물품의서' ? (
            <ReporterGiftShow product={displayProduct} />
          ) : displayProduct.file === '출장비정산서' ? (
            <TravelExpensesShow product={displayProduct} />
          ) : displayProduct.file === '고객사실비청구서' ? (
            <CustomerShow product={displayProduct} />
          ) : null}
          <div className="mt-5 mb-3 text-sm">
            <span className="font-bold">수신자:</span>
            {states?.map((stateItem, index) => (
              <span key={index} className="ml-2">
                {stateItem.name}{' '}
                <span
                  className={`font-bold ${
                    stateItem.state === '승인'
                      ? 'text-green-600'
                      : stateItem.state === '반려'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  ({stateItem.state})
                </span>
                {index !== states.length - 1 && ','}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-end mt-3">
            <div>
              {!isMst && !oneApproved ? (
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded text-sm mr-2 hover:bg-gray-600"
                  onClick={openEditModal}
                >
                  수정하기
                </button>
              ) : null}
            </div>
            <div>
              {!isMst && !oneApproved ? (
                <button
                  className="bg-brand text-white px-2 py-1 rounded text-sm mr-2 hover:bg-red-700"
                  onClick={handleDelete}
                >
                  승인 전 삭제
                </button>
              ) : null}
              {isMst ? (
                <button
                  className="bg-brand text-white px-2 py-1 rounded text-sm mr-2 hover:bg-red-700"
                  onClick={handleDelete}
                >
                  삭제
                </button>
              ) : null}
            </div>
          </div>
          {isMst ? (<div className="flex justify-end items-center mt-3">
            <div className="flex items-center">
              <input
                 type="checkbox"
                 id="verifiedPostCheckbox"
                 checked={localMstCheck}
                 onChange={handleChecked}
                 className="form-checkbox h-5 w-5 text-green-600" // Adjust styles as needed
              />
              <label htmlFor="verifiedPostCheckbox" className="ml-2 text-sm text-gray-900">
                {localMstCheck ? '확인된 게시물입니다.' : '확인 하셨으면 클릭!'}
              </label>
            </div>
          </div>) : null}

          {!isMst && !oneApproved ? (
            <div className="flex justify-end items-center">
              <div>
                <p className="text-sm text-gray-500 mt-1">첨부파일 추가하기</p>
                <input
                  type="file"
                  multiple
                  className="text-xm"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files);
                    setTempFiles(newFiles); // 선택된 파일을 tempFiles에 설정합니다.
                  }}
                />
                <button
                  className="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-xs py-1 px-2 rounded"
                  onClick={handleSubmit}
                >
                  저장
                </button>
              </div>
            </div>
          ) : null}

          {files.length > 0 ? (
            <div className="flex flex-col items-start space-y-1 p-3">
              <hr className="border-t border-gray-200 w-full" />
              <h3 className="text-sm font-bold text-gray-700">첨부파일</h3>
              {files.map((file, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <a
                    href={file.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded border border-gray-700 text-xs hover:bg-gray-500 hover:text-white transition duration-200 ease-in-out"
                  >
                    다운로드 클릭
                  </a>
                  <span className="text-gray-700 text-xs">{file.name}</span>
                  {!isMst && !oneApproved ? (
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `${file.name} 파일을 삭제하시겠습니까?`,
                        );
                        if (confirmDelete) {
                          deleteFile(file, index);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      X
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="container mx-auto mt-5 flex w-full justify-end">
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
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 ml-3"
            onClick={() => htmlToFile(htmlString, 'doc', product.title)}
          >
            인 쇄
          </button>
        </div>
      </div>
      {reasonText ? (
        <div className="xl:w-2/6 xl:py-3 xl:pr-3 xl:pl-0 px-3">
          <ReasonText reasonText={reasonText} />
        </div>
      ) : null}
    </div>
  );
}