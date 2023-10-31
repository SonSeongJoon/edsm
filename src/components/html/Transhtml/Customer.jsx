export const Customer = ({
  file,
  name,
  content,
  dept,
  title,
  data,
  charge,
  price,
  admitMember,
  corporation,
  date,
}) => {
  let keys = [];

  if (admitMember) {
    keys = Object.keys(admitMember);
    if (keys.includes('한현석')) {
      if (keys.length === 1) {
        keys.unshift('');
      } else {
        keys = keys.filter((key) => key !== '한현석');
        keys.push('한현석');
      }
    }
  }

  const formattedContent = content.replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${file}</title>
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 8px;
        }
        table {
            table-layout: fixed;
            width: 100%;
            height: 90%;
        }
        .corporation-text {
            text-align: center;
            font-size: 24px; 
            margin-top: 40px;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            font-weight: bold;
        }

    </style>
</head>
<body>
    <div>
        <h1>고객사실비청구서</h1>
        <table style="text-align: center;">
            <tr>
                <td style="width: 23%;">품 의 일 자</td>
                <td style="width: 23%;">${date}</td>
                <td style="width: 18%;">본부장</td>
                <td style="width: 18%;">대표이사</td>
            </tr>
            <tr>
                <td>부 서</td>
                <td colspan="1">${dept}</td>
                <td rowspan="2">${keys[0] ? '전자승인' : ''}</td>
                <td rowspan="2">${keys[1] ? '전자승인' : ''}</td>
            </tr>
            <tr>
                <td>품 의 자</td>
                <td colspan="1">${name}</td>
            </tr>
            <tr>
                <td>제 목</td>
                <td colspan="4" style="text-align: left;">${title}</td>
            </tr>
            <tr>
                <td colspan="4">청 구 내 역</td>
            </tr>
            <tr style="height: 500px;">
                <td colspan="4" style="text-align: left;" >
                    <p>회사명: ${formattedContent}</p> 
                    <p>청구내역: ${data}</p> 
                    <p>사후정산수수료 적용 여부: ${charge}</p>
                    <p>청구금액: ${price}</p>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: left;">
                    <p>상기와 같이 청구서 확인을 요청 하오니 결재를 바랍니다.</p>
                </td>
            </tr>
        </table>
    </div>
    <div class="corporation-text">
        ${corporation}
    </div>
</body>
</html>
`;
};
