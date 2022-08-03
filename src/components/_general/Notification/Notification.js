import React, { useState, useEffect, useCallback, useRef } from "react";
import "./notification.css";

import { ReactComponent as Success } from "./svg/success.svg";

export const NOTIFICATION_TYPES = {
	SUCCESS: "success",
	ERROR: "error",
	FANCY: "fancy",
};

export default function Notification({ dispatch, notification, location }) {
	const [width, setWidth] = useState(100);
	const [intervalID, setIntervalID] = useState(null);
	const itemRef = useRef();

	const handleStartTimer = useCallback(() => {
		const timeToWait =
			notification.time == null ? 500000 : notification.time / 200;
		const id = setInterval(() => {
			setWidth((prev) => {
				if (prev > 0) {
					return prev - 0.5;
				}

				clearInterval(id);
				return prev;
			});
		}, timeToWait);

		setIntervalID(id);
	}, [notification]);

	useEffect(() => {
		setTimeout(() => itemRef.current.classList.add("show"), 200);
	}, []);

	useEffect(() => {
		setTimeout(() => handleStartTimer(), 400);
	}, [handleStartTimer]);

	const handlePauseTimer = useCallback(() => {
		clearInterval(intervalID);
	}, [intervalID]);

	const handleCloseNotification = useCallback(() => {
		handlePauseTimer();
		itemRef.current.classList.remove("show");
		setTimeout(() => {
			dispatch({
				type: "REMOVE_NOTIFICATION",
				payload: {
					id: notification.id,
					location: location,
				},
			});
		}, 400);
	}, [handlePauseTimer, notification, dispatch, location]);

	useEffect(() => {
		if (width === 0) {
			// Close notification
			handleCloseNotification();
		}
	}, [width, handleCloseNotification]);

	return (
		<div
			ref={itemRef}
			onMouseEnter={handlePauseTimer}
			onMouseLeave={handleStartTimer}
			onClick={handleCloseNotification}
			className={`notification-item ${notification.type}`}
		>
			<p style={notification.style?.card || {}}>
				<Success fill="white" stroke="green" strokeWidth="0" />
				{notification.message}
			</p>

			<div
				className={"bar"}
				style={{
					width: `${width}%`,
					...(notification.style?.bar || {}),
				}}
			/>
		</div>
	);
}
