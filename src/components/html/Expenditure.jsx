export const expenditure = ({ file, dept, deel, title, items }) => {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${file}</title> <!-- Use the title variable here -->
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 8px;
        }
    </style>
</head>
<body>
    
    <h1 style="text-align: center; margin-bottom: 20px;">${file}</h1> <!-- Use the title variable here -->
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
    <div style="margin-bottom: 70px;">
    <table style="width: 100%; text-align: center;">
            <tr>
                <td style="width: 50px">부&nbsp;&nbsp;서</td>
                <td style="width: 100px">${dept}</td>
                <td style="width: 50px">담&nbsp;&nbsp;당</td>
                <td style="width: 100px"></td>
            </tr>
            <tr>
                <td style="width: 50px">제&nbsp;&nbsp;목</td>
                <td style="width: 100px">${title}</td>
                <td style="width: 50px">금&nbsp;&nbsp;액</td>
                <td style="width: 100px"></td>
            </tr>
      </table>
     </div>
     <div style="text-align: center; margin-bottom: 70px;">-&nbsp;내&nbsp;&nbsp;역&nbsp;-</div>
      
      <div style="text-align: left;">거래처: ${deel}</div>
      <div style="text-align: center; margin-bottom: 5px;">
      <table style="width: 100%; text-align: center; ">
            <tr>
                <td style="width: 100px; padding: 15px;">내&nbsp;&nbsp;역</td>
                <td style="width: 100px; padding: 15px;">금&nbsp;&nbsp;액</td>
                <td style="width: 100px; padding: 15px;">비&nbsp;&nbsp;고</td>
            </tr>
            <tr>
                <td style="width: 100px; height: 45px;">${items[0].title}</td>
                <td style="width: 100px; height: 45px;">${items[0].amount}</td>
                <td style="width: 100px; height: 45px;">${items[0].note}</td>
            </tr>
            <tr>
                <td style="width: 100px; height: 45px;">${items[1] ? items[1].title : ''}</td>
                <td style="width: 100px; height: 45px;">${items[1] ? items[1].amount : ''}</td>
                <td style="width: 100px; height: 45px;">${items[1] ? items[1].note : ''}</td>
            </tr>
            <tr>
                <td style="width: 100px; height: 45px;">${items[2] ? items[2].title : ''}</td>
                <td style="width: 100px; height: 45px;">${items[2] ? items[2].amount : ''}</td>
                <td style="width: 100px; height: 45px;">${items[2] ? items[2].note : ''}</td>
            </tr>
            <tr>
                <td style="width: 100px; height: 45px;">${items[3] ? items[3].title : ''}</td>
                <td style="width: 100px; height: 45px;">${items[3] ? items[3].amount : ''}</td>
                <td style="width: 100px; height: 45px;">${items[3] ? items[3].note : ''}</td>
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
</html>`;
};