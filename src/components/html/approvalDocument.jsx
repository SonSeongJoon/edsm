export const approvalDocument = ({
	                                 file,
	                                 title,
	                                 detail,
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
        <h1 style="text-align: center; margin-bottom: 20px;">${title}</h1>
        <div style="margin-bottom: 70px;">
            <p style="white-space: pre-line;">${detail}</p>
        </div>
    </body>
    </html>`;
};
