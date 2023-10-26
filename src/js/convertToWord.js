export function htmlToFile(htmlString, fileExtension, fileName ) {
	if (fileExtension === 'doc') {
		printHTML(htmlString);
	}

	// const sourceMap = {
	// 	doc: 'data:application/msword;charset=utf-8,',
	// 	html: 'data:text/html;charset=utf-8,',
	// };
	// const source = sourceMap[fileExtension] || sourceMap['html'];
	// const fileDownload = document.createElement('a');
	// document.body.appendChild(fileDownload);
	// fileDownload.href = source + encodeURIComponent(htmlString);
	// fileDownload.download = fileName + '.' + fileExtension;
	// fileDownload.click();
	// document.body.removeChild(fileDownload);
}
function printHTML(htmlString) {
	const printWindow = window.open('', '_blank');
	printWindow.document.open();
	printWindow.document.write(htmlString);
	printWindow.document.close();

	setTimeout(() => {
		printWindow.print();
	}, 250);
}