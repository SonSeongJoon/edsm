import React, { useState } from 'react';

const options = ['지출결의서', '휴가계'];
export default function Write() {
  const [title, setTitle] = useState(''); // State to store the title

  const htmlString = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title> <!-- Use the title variable here -->
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 8px;
        }
    </style>
</head>
<body>
    
    <h1 style="text-align: center; margin-bottom: 20px;">${title}</h1> <!-- Use the title variable here -->
    <div style="text-align: right;">
    <table style="width: 30%;">
        <tr>
            <th style="width: 70px;">&nbsp;담&nbsp;&nbsp;당&nbsp;</th>
            <th style="width: 70px;">&nbsp;팀&nbsp;&nbsp;장&nbsp;</th>
            <th style="width: 70px;">&nbsp;본부장&nbsp;</th>
            <th style="width: 70px;">&nbsp;대표이사&nbsp;</th>
        </tr>
        <tr>
            <td style="height: 45px;"></td>
            <td style="height: 45px;"></td>
            <td style="height: 45px;"></td>
            <td style="height: 45px;"></td>
        </tr>
        </div>
        <!-- 추가 항목은 여기에 -->
    </table>
    <div style="margin-top: 15px; text-align: left;">날짜: 2023년 09월 12일</div>
    <div style="margin-bottom: 100px;">
    <table style="width: 100%; text-align: center;">
            <tr>
                <td style="width: 100px">부&nbsp;&nbsp;서</td>
                <td></td>
                <td style="width: 100px">담&nbsp;&nbsp;당</td>
                <td></td>
            </tr>
            <tr>
                <td style="width: 100px">제&nbsp;&nbsp;목</td>
                <td></td>
                <td style="width: 100px">금&nbsp;&nbsp;액</td>
                <td></td>
            </tr>
      </table>
     </div>
     <div style="text-align: center; margin-bottom: 100px;">-&nbsp;내&nbsp;&nbsp;역&nbsp;-</div>
      
      <div style="text-align: center; margin-bottom: 5px;">
      <table style="width: 100%; text-align: center; ">
            <tr>
                <td style="width: 100px; padding: 15px;">내&nbsp;&nbsp;역</td>
                <td style="width: 100px; padding: 15px;">금&nbsp;&nbsp;액</td>
                <td style="width: 100px; padding: 15px;">비&nbsp;&nbsp;고</td>
            </tr>
            <tr>
                <td style="width: 100px; height: 45px;"></td>
                <td style="width: 100px; height: 45px;"></td>
                <td style="width: 100px; height: 45px;"></td>
            </tr>
            <tr>
                <td style="width: 100px; height: 45px;"></td>
                <td style="width: 100px; height: 45px;"></td>
                <td style="width: 100px; height: 45px;"></td>
            </tr>
            <tr>
                <td style="width: 100px; height: 45px;"></td>
                <td style="width: 100px; height: 45px;"></td>
                <td style="width: 100px; height: 45px;"></td>
            </tr>
            <tr>
                <td style="width: 100px; height: 45px;"></td>
                <td style="width: 100px; height: 45px;"></td>
                <td style="width: 100px; height: 45px;"></td>
            </tr>
            <tr>
                <td style="width: 100px; height: 45px;">계</td>
                <td style="width: 100px; height: 45px;"></td>
                <td style="width: 100px; height: 45px;"></td>
            </tr>
        </table>
        </div>
        <p style="text-align: center;">상기와 같이 경비지출을 의뢰하오니 결재를 바랍니다.</p>
</body>
</html>
`;

  function htmlToFile(fileExtension) {
    let source =
      fileExtension === 'doc'
        ? 'data:application/msword;charset=utf-8,' + encodeURIComponent(htmlString)
        : 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlString);

    let fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'downloadedFile.' + fileExtension;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  }

  return (
    <>
      <div className="">
        <div className="container border border-gray-500">
          <div className="header border-b border-gray-500 p-2">
            <label>제 목: </label>
            <input type="text" placeholder=' 제목입력' className='border-b border-black' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label className='ml-5'>문서 종류:</label>
            <select id="select" className="border border-gray-400">
              {options && options.map((option, index) => <option key={index}>{option}</option>)}
            </select>
          </div>
          <div className="content p-2">
            <label>부서명: </label>
            <input type="text" placeholder=' 제목입력' className='border-b border-black'/>
            <label className='ml-2'>금 액: </label>
            <input type="text" placeholder=' 제목입력' className='border-b border-black'/>
            <label className='ml-2'>거 래 처: </label>
            <input type="text" placeholder=' 제목입력' className='border-b border-black'/>
          </div>
          <div className="content p-2">
            <label>내 역: </label>
            <input type="text" placeholder=' 제목입력' className='border-b border-black'/>
            <label className='ml-2'>금 액: </label>
            <input type="text" placeholder=' 제목입력' className='border-b border-black'/>
            <label className='ml-2'>비 고: </label>
            <input type="text" placeholder=' 제목입력' className='border-b border-black'/>
          </div>
        </div>

        <button onClick={() => htmlToFile('doc')}>워드(.doc) 다운로드</button>
      </div>
    </>
  );
}
