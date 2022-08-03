import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import ShadowPicker from "./ShadowPicker";
import SliderComponent from "./SliderComponent";

const imageResizeFieldContainerStyle = {
	display: "flex",
	flexWrap: "wrap",
	zIndex: 5,
};

const imageTransformFieldStyle = {
	display: "flex",
};

export default function ImageResizer() {
	const {
		imageTransforms,
		setImageTransforms,
		imageSources,
		setImageSources,
	} = useContext(PosterContext);

	function handleImageResize(e, key, index) {
		setImageTransforms((prevTransforms) => {
			const newTransforms = [...prevTransforms];
			newTransforms[index][key].value = e.target.value;
			return newTransforms;
		});
	}

	return (
		<div>
			<div style={imageResizeFieldContainerStyle}>
				{imageSources
					.filter((source) => source.src != null)
					.map((source) => {
						return (
							<fieldset key={source.id}>
								<legend>Player {source.id + 1} image</legend>
								<div style={imageTransformFieldStyle}>
									{Object.entries(
										imageTransforms[source.id]
									).map(([key, value]) => (
										<div key={key}>
											<SliderComponent
												props={{
													min: value.min,
													max: value.max,
													step: value.step,
													label: key,
													value: value.value,
													setValue: (e) =>
														handleImageResize(
															e,
															key,
															source.id
														),
												}}
											/>
										</div>
									))}
								</div>
								<ShadowPicker index={source.id} />
								<button
									onClick={() =>
										setImageSources((prevSources) => {
											const newSources = [...prevSources];
											newSources[source.id].src = null;
											return newSources;
										})
									}
								>
									Delete image
								</button>
							</fieldset>
						);
					})}
			</div>
		</div>
	);
}
