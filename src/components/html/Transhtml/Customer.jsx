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
  let keys_1 = [];
  let keys_2 = [];
  let keys_3 = [];
  let keys_4 = [];

  if (admitMember) {
    keys = Object.keys(admitMember);

    // '한현식'을 마지막으로 이동
    if (keys.includes('한현석')) {
      keys_4.push('한현석'); // '한현식'을 배열의 마지막에 추가
    }

    // '김연재' 또는 '윤홍민'을 첫 번째 위치로 이동
    if (keys.includes('김연재') || keys.includes('윤홍민')) {
      const nameToAdd = keys.includes('김연재') ? '김연재' : '윤홍민';
      keys = keys.filter((key) => key !== nameToAdd);
      keys_1.unshift(nameToAdd); // 해당 이름을 배열의 첫 번째로 추가
    }

    // '권미경'을 두 번째 위치로 이동
    if (keys.includes('권미경')) {
      keys_2.push('권미경');
    }

    // 나머지 이름은 keys_3 배열에 추가
    keys.forEach((key) => {
      if (key !== '한현석' && key !== '김연재' && key !== '윤홍민' && key !== '권미경') {
        keys_3.push(key);
      }
    });
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
                <td style="width: 23%; text-align: left;">${date}</td>
                <td style="width: 18%;">디자인/영상본부</td>
                <td style="width: 18%;">경영지원팀</td>
                <td style="width: 18%;">본부장</td>
                <td style="width: 18%;">대표이사</td>

            </tr>
            <tr>
                <td>부 서</td>
                <td colspan="1" style="text-align: left">${dept}</td>
                <td rowspan="2">${keys_1[0] ? '전자승인' : ''}</td>
                <td rowspan="2">${keys_2[0] ? '전자승인' : ''}</td>
                <td rowspan="2">${keys_3[0] ? '전자승인' : ''}</td>
                <td rowspan="2">${keys_4[0] ? '전자승인' : ''}</td>
            </tr>
            <tr>
                <td>품 의 자</td>
                <td colspan="1" style="text-align: left">${name}</td>
            </tr>
            <tr>
                <td>제 목</td>
                <td colspan="6" style="text-align: left;">${title}</td>
            </tr>
            <tr>
                <td colspan="6">청 구 내 역</td>
            </tr>
            <tr style="height: 500px;">
                <td colspan="6" style="text-align: left;" >
                    <p>회사명: ${formattedContent}</p> 
                    <p>청구내역: ${data}</p> 
                    <p>사후정산수수료 적용 여부: ${charge}</p>
                    <p>청구금액: ${price}</p>
                </td>
            </tr>
            <tr>
                <td colspan="6" style="text-align: left;">
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
