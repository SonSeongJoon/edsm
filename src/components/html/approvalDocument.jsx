import moment from 'moment';

export const approvalDocument = ({
  file,
  name,
  content,
  dept,
  title,
   period,
   price,
   note,
}) => {
  const date = moment().format('YYYY.MM.DD');

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
    </style>
</head>
<body>
    <div>
        <h1>품 의 서</h1>
        <table style="text-align: center;">
            <tr>
                <td style="width: 23%;">품 의 일 자</td>
                <td style="width: 23%;">${date}</td>
                <td style="width: 18%;">담 당</td>
                <td style="width: 18%;">본부장</td>
                <td style="width: 18%;">대표이사</td>
            </tr>
            <tr>
                <td>부 서</td>
                <td colspan="1">${dept}</td>
                <td rowspan="2"></td>
                <td rowspan="2"></td>
                <td rowspan="2"></td>
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
            <tr style="height: 370px;">
                <td colspan="5" style="text-align: left;" >
                    <p>${content}</p>
                    <p>기 간: ${period}</p>
                    <p>금 액: ${price}</p>
                    <p>비 고: ${note}</p>
                </td>
            </tr>
            <tr>
                <td colspan="5" style="text-align: left;">
                    <p>상기와 같이 경비지출을 의뢰하오니 결재를 바랍니다.</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
`;
};
