import React, { useContext } from "react";
import { PosterContext } from "../../pages/PlayerPosterPage";
import ShadowPicker from "./ShadowPicker";
import SliderComponent from "./SliderComponent";
import FileInputButton from "./FileInputButton";

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
		<div className="image-resizer-container">
			{imageSources.map((source) => {
				return (
					<fieldset key={source.id} className="image-field-set">
						<legend>Player {source.id + 1} image</legend>

						{source.src != null ? (
							<div className="player-resizer-has-image">
								<div className="option-header">Translation</div>
								<div className="image-resizer-slider-container">
									{Object.entries(
										imageTransforms[source.id]
									).map(([key, value]) => (
										<div key={key}>
											<SliderComponent
												props={{
													min: value.min,
													max: value.max,
													step: value.step,
													label: value.label,
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
									className="generic-button"
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
							</div>
						) : (
							<FileInputButton
								fileCallback={(file) => {
									if (
										file.type &&
										!file.type.startsWith("image/")
									) {
										console.log(
											"File is not an image.",
											file.type,
											file
										);
										return;
									}

									const reader = new FileReader();
									reader.addEventListener("load", (event) => {
										setImageSources((prevSources) => {
											const newSources = [...prevSources];
											newSources[source.id].src =
												event.target.result;
											return newSources;
										});
									});
									reader.readAsDataURL(file);
								}}
							/>
						)}
					</fieldset>
				);
			})}
		</div>
	);
}
