import React, { useContext } from "react";
import PlayerNameImage from "./PlayerNameImage";
import StatDisplayer from "./StatDisplayer";
import { PosterContext } from "../../pages/PlayerPosterPage";

const posterResizableStyle = {
	display: "flex",
	margin: "1rem 2rem",
	boxShadow: "0 0 10px var(--clr-third)",
	backgroundColor: "#f8f8f8",
	overflow: "hidden",
};

export default function PosterArea() {
	const { textState } = useContext(PosterContext);

	return (
		<div
			className="poster-area"
			style={{
				...posterResizableStyle,
				backgroundColor: textState.bg.style.color,
			}}
		>
			<PlayerNameImage index={0} />
			<StatDisplayer />
			<PlayerNameImage index={1} />
		</div>
	);
}

/*
function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    clearDynamicLink(link); 
}

function DownloadAsImage() {
    var element = $("#table-card")[0];
    html2canvas(element).then(function (canvas) {
        var myImage = canvas.toDataURL();
        downloadURI(myImage, "cartao-virtual.png");
    });
}

*/

/*
useEffect(() => {
		const vw = Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		);
		const vh = Math.max(
			document.documentElement.clientHeight || 0,
			window.innerHeight || 0
		);
		console.log(vw, vh);
	}, []);
*/
