import html2canvas from "html2canvas";

export default function getScreenShot(selector) {
	let c = document.querySelector(selector);
	html2canvas(c).then((canvas) => {
		var t = canvas.toDataURL().replace("data:image/png;base64,", "");
		downloadBase64File("image/png", t, "image");
	});
}

function downloadBase64File(contentType, base64Data, fileName) {
	const linkSource = `data:${contentType};base64,${base64Data}`;
	const downloadLink = document.createElement("a");
	downloadLink.href = linkSource;
	downloadLink.download = fileName;
	downloadLink.click();
}
