export const Overtime = ({
  file,
  name,
  dept,
  title,
  period,
  overReason,
  useWhen,
  admitMember,
  corporation,
   date
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
        <h1>초과 근무 사전 품의서</h1>
        <table style="text-align: center;">
            <tr>
                <td style="width: 23%;">품 의 일 자</td>
                <td style="width: 23%; text-align: left;" >${date}</td>
                <td style="width: 18%;">본부장</td>
                <td style="width: 18%;">대표이사</td>
            </tr>
            <tr>
                <td>부 서</td>
                <td colspan="1" style="text-align: left;">${dept}</td>
                <td rowspan="2">${keys[0] ? '전자승인' : ''}</td>
                <td rowspan="2">${keys[1] ? '전자승인' : ''}</td>
            </tr>
            <tr>
                <td>품 의 자</td>
                <td colspan="1" style="text-align: left;">${name}</td>
            </tr>
            <tr>
                <td>제 목</td>
                <td colspan="3" style="text-align: left">${title}</td>
            </tr>
            <tr>
                <td colspan="4">내 용</td>
            </tr>
            <tr style="height: 500px;">
                <td colspan="4" style="text-align: left;" >
                    <p>근무자: ${name}</p> 
                    <p>초과근무 예정 일시: ${period}</p> 
                    <p>사 유: ${overReason}</p>
                    <p>대체휴무 예정 일자: ${useWhen}</p>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: left;">
                  <ul>
                      <li>초과 근무는 1일 4시간 이내로 제한합니다. (4시간 이상은 금지)</li>
                      <li>초과근무의 최소 시간은 1시간입니다. (식사 시간 제외)</li>
                      <li>사전 품의 없이 초과근무를 하지 않습니다. (결재자 부재의 경우 사후 결재)</li>
                      <li>경영지원팀에서는 초과근무 시간을 기록하고 대체휴무 사용 여부를 확인합니다.</li>
                      <li>대체휴무는 초과 근무일로부터 한 달 이내 사용합니다.</li>
                      <li>초과근무 시 지문인식 필수입니다.</li>
                  </ul>
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
