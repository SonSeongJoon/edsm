export const vacationPlan = ({
  displayName,
  file,
  VacationReason,
  dept,
  AttributionYear,
  TotalLeaveDays,
  UsedDays,
  RemainDays,
                                Period,
                                name
}) => {
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
    <div class="centered">
        <table style="text-align: center;">
            <tr>
            <td rowspan="2" colspan="2">휴가계</td>
            <td style="width: 20%;">본부장</td>
            <td style="width: 20%;">대표이사</td>
        </tr>
            <tr>
                <td style="height: 45px;"></td>
                <td style="height: 45px;"></td>
            </tr>
            <tr>
                <td style="width: 25%;">소속</td>
                <td style="width: 25%;">${dept}</td>
                <td style="width: 25%;">성명</td>
                <td style="width: 25%;">${displayName}</td>
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
                <td colspan="3">${Period}</td>
            </tr>
            <tr style="height: 370px;">
                <th>휴가사유</th>
                <td colspan="3">${VacationReason}</td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: left;">
                    <p style="text-align: end;">위 신청인 ${displayName}(인)</p>
                    <br>
                    <p style="text-align: center;">서울아이알네트워크㈜  대표이사  귀하</p>
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
</body>
</html>
`;
};
