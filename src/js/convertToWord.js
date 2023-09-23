export function htmlToFile(htmlString, fileExtension) {
	let source =
		fileExtension === 'doc'
			? 'data:application/msword;charset=utf-8,' + encodeURIComponent(htmlString)
			: 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlString);

	let fileDownload = document.createElement('a');
	document.body.appendChild(fileDownload);
	fileDownload.href = source;
	fileDownload.download = 'downloadedFile.' + fileExtension;
	fileDownload.click();
	document.body.removeChild(fileDownload);
}
