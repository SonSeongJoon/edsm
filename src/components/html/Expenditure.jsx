export const expenditure = ({ file, dept, deel, title, items, date, name}) => {
	const totalAmount = items.reduce((sum, item) => {
		if (item && item.amount) {
			// 쉼표 제거 후 정수로 변환
			const amount = parseInt(item.amount.replace(/,/g, '')) || 0;
			return sum + amount;
		}
		return sum;
	}, 0);

	// 합산된 금액을 쉼표가 포함된 문자열로 변환합니다.
	const formattedTotalAmount = totalAmount.toLocaleString();


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
            <th style="width: 70px;">&nbsp;본부장&nbsp;</th>
            <th style="width: 70px;">&nbsp;대표이사&nbsp;</th>
        </tr>
        <tr>
            <td style="height: 45px;"></td>
            <td style="height: 45px;"></td>
        </tr>
        </div>
        <!-- 추가 항목은 여기에 -->
    </table>
    <div style="margin-top: 15px; text-align: left;">날짜 : ${date}</div>
    <div style="margin-bottom: 70px;">
    <table style="width: 100%; text-align: center;">
            <tr>
                <td style="width: 50px; background-color: #E6EEF7;">부&nbsp;&nbsp;서</td>
                <td style="width: 100px">${dept}</td>
                <td style="width: 50px; background-color: #E6EEF7;"">담&nbsp;&nbsp;당</td>
                <td style="width: 100px">${name}</td>
            </tr>
            <tr>
                <td style="width: 50px; background-color: #E6EEF7;">제&nbsp;&nbsp;목</td>
                <td style="width: 100px">${title}</td>
                <td style="width: 50px; background-color: #E6EEF7;">금&nbsp;&nbsp;액</td>
                <td style="width: 100px">${formattedTotalAmount}</td>
            </tr>
      </table>
     </div>
     <div style="text-align: center; margin-bottom: 70px;">-&nbsp;내&nbsp;&nbsp;역&nbsp;-</div>
      
      <div style="text-align: left;">거래처: ${deel}</div>
      <div style="text-align: center; margin-bottom: 5px;">
      <table style="width: 100%; text-align: center; ">
            <tr style="background-color: #E6EEF7;">
                <td style="width: 100px; padding: 10px;">내&nbsp;&nbsp;역</td>
                <td style="width: 100px; padding: 10px;">금&nbsp;&nbsp;액</td>
                <td style="width: 100px; padding: 10px;">비&nbsp;&nbsp;고</td>
            </tr>
            <tr>
                <td style="width: 100px; height: 30px; font-size: 13px;">${items[0].title}</td>
                <td style="width: 100px; height: 30px; font-size: 13px;">${items[0].amount}</td>
                <td style="width: 100px; height: 30px; font-size: 13px;">${items[0].note}</td>
            </tr>
            <tr>
                <td style="width: 100px; height: 30px; font-size: 13px;">${
	  items[1] ? items[1].title : ''
  }</td>
                <td class="amount" style="width: 100px; height: 30px; font-size: 13px;">${
	  items[1] ? items[1].amount : ''
  }</td>
                <td style="width: 100px; height: 30px; font-size: 13px;">${
	  items[1] ? items[1].note : ''
  }</td>
            </tr>
            <tr>
                <td style="width: 100px; height: 30px; font-size: 13px;">${
	  items[2] ? items[2].title : ''
  }</td>
                <td class="amount" style="width: 100px; height: 30px; font-size: 13px;">${
	  items[2] ? items[2].amount : ''
  }</td>
                <td style="width: 100px; height: 30px; font-size: 13px;">${
	  items[2] ? items[2].note : ''
  }</td>
            </tr>
            <tr>
                <td style="width: 100px; height: 30px; font-size: 13px;">${
	  items[3] ? items[3].title : ''
  }</td>
                <td class="amount" style="width: 100px; height: 30px; font-size: 13px;">${
	  items[3] ? items[3].amount : ''
  }</td>
                <td style="width: 100px; height: 30px; font-size: 13px;">${
	  items[3] ? items[3].note : ''
  }</td>
            </tr>
            <tr style="background-color: #E6EEF7;">
                <td style="width: 100px; height: 30px; font-size: 13px;">계</td>
                <td style="width: 100px; height: 30px; font-size: 13px;">${formattedTotalAmount}</td>
                <td style="width: 100px; height: 30px; font-size: 13px;"></td>
            </tr>
        </table>
        </div>
        <div style="text-align: center">
        <p style="text-align: center; font-size: 13px;">상기와 같이 경비지출을 의뢰하오니 결재를 바랍니다.</p>
        <img src="${
	  window.location.origin
  }/seoulir_html.png" alt="seoulir">
    </div>
 
</body>
</html>`;
};
