export const vacationPlan = ({
  file,
  AttributionYear,
  TotalLeaveDays,
  UsedDays,
  RemainDays,
  Period,
  VacationReason,
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
        </style>
    </head>
    <body>
        <h1 style="text-align: center; margin-bottom: 20px;">${file}</h1>
        <div style="margin-bottom: 70px;">
        <table style="width: 100%; text-align: center;">
                <tr>
                    <th>귀속연도</th>
                    <td>${AttributionYear}</td>
                </tr>
                <tr>
                    <th>총 연차일수</th>
                    <td>${TotalLeaveDays}</td>
                </tr>
                <tr>
                    <th>기사용일수</th>
                    <td>${UsedDays}</td>
                </tr>
                <tr>
                    <th>잔여일수</th>
                    <td>${RemainDays}</td>
                </tr>
                <tr>
                    <th>휴가기간</th>
                    <td>${Period}</td>
                </tr>
                <tr>
                    <th>휴가사유</th>
                    <td>${VacationReason}</td>
                </tr>
          </table>
         </div>
    </body>
    </html>`;
};
