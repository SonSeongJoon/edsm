export const vacationPlan = ({
  file,
  VacationReason,
  dept,
  AttributionYear,
  TotalLeaveDays,
  UsedDays,
  RemainDays,
  startDate,
  endDate,
  name,
  admitMember,
  corporation,
}) => {
  let keys = [];

  if (admitMember) {
    keys = Object.keys(admitMember);
    if (keys.includes('한현석')) {
      if (keys.length === 1) {
        keys.unshift(''); // 한현석만 있으면 앞에 빈 값을 추가
      } else {
        keys = keys.filter((key) => key !== '한현석');
        keys.push('한현석');
      }
    }
  }
   const calculateDateDifference = (start, end) => {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      const differenceInTime = endDateObj - startDateObj;
      return parseInt(differenceInTime / (1000 * 60 * 60 * 24)) + 1;
   };

   const daysDifference = calculateDateDifference(startDate, endDate);

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
    <div class="centered">
        <table style="text-align: center;">
            <tr>
            <td rowspan="2" colspan="2">휴가계</td>
            <td style="width: 20%;">본부장</td>
            <td style="width: 20%;">대표이사</td>
        </tr>
            <tr>
                <td style="height: 45px;">${keys[0] ? '전자승인' : ''}</td>
                <td style="height: 45px;">${keys[1] ? '전자승인' : ''}</td>
            </tr>
            <tr>
                <td style="width: 25%;">소속</td>
                <td style="width: 25%;">${dept}</td>
                <td style="width: 25%;">성명</td>
                <td style="width: 25%;">${name}</td>
            </tr>
            <tr>
                <td style="width: 25%;">귀속 연도</td>
                <td style="width: 25%;">${AttributionYear}</td>
                <td style="width: 25%;">총 연차 일수</td>
                <td style="width: 25%;">${TotalLeaveDays}</td>
            </tr>
            <tr>
                <td style="width: 25%;">기사용일수</td>
                <td style="width: 25%;">${UsedDays}</td>
                <td style="width: 25%;">잔여일수</td>
                <td style="width: 25%;">${RemainDays}</td>
            </tr>
            <tr>
                <td>휴가기간</td>
                <td colSpan="3">${startDate} ~ ${endDate} (${daysDifference}일간)</td>
            </tr>
            <tr style="height: 300px;">
                <th>휴가사유</th>
                <td colspan="3">${VacationReason}</td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: left;">
                    <p style="text-align: end;">위 신청인 ${name}(인)</p>
                    <br>
                    <p style="text-align: center;">서울아이알 대표이사  귀하</p>
                    <br>
                    <p>* 휴가자는 사유가 있을시 이를 증명할 사본을 제출함. (예 : 예비군훈련 등..)</p>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: left;">
                    <p>※ 본부장까지 결재를 받은 후 제출하여 주십시오.(대표이사 제외)</p>
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
