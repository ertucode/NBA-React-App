import React, { useRef } from "react";

export default function FileInputButton({ fileCallback }) {
	const fileRef = useRef();

	return (
		<>
			<button
				className="file-upload-button"
				onClick={() => fileRef.current.click()}
			>
				Browse on your device
			</button>
			<input
				ref={fileRef}
				type="file"
				accept=".jpg, .jpeg, .png"
				onChange={(e) => fileCallback(e.target.files[0])}
				style={{ display: "none" }}
			/>
		</>
	);
}
