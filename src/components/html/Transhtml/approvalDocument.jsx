import moment from 'moment';

export const approvalDocument = ({
  file,
  name,
  content,
  dept,
  title,
  startDate,
  endDate,
  price,
  note,
  admitMember,
  corporation,
}) => {
  const date = moment().format('YYYY.MM.DD');
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
        <h1>품 의 서</h1>
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
                <td rowspan="2">${keys[0] ? keys[0] : ''}</td>
                <td rowspan="2">${keys[1] ? keys[1] : ''}</td>
            </tr>
            <tr>
                <td>품 의 자</td>
                <td colspan="1">${name}</td>
            </tr>
            <tr>
                <td>제 목</td>
                <td colspan="4">${title}</td>
            </tr>
            <tr>
                <td colspan="5">내 용</td>
            </tr>
            <tr style="height: 500px;">
                <td colspan="5" style="text-align: left;" >
                    <p>항 목</p> 
                    <p>${formattedContent}</p>
                    <p>기 간: ${startDate} ~ ${endDate}</p> 
                    <p>금 액: ${price}</p>
                    <p>비 고: ${note}</p>
                </td>
            </tr>
            <tr>
                <td colspan="5" style="text-align: left;">
                    <p>상기와 같이 의뢰하오니 결재를 바랍니다.</p>
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
