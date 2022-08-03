import React, { useContext, useReducer } from "react";
import { v4 } from "uuid";
import Notification from "./Notification";

const NotificationContext = React.createContext();

function handleNotificationLocation(location) {
	const styles = {};

	if (location.startsWith("top")) {
		styles.top = "10px";
	}
	if (location.startsWith("bottom")) {
		styles.bottom = "10px";
	}
	if (location.endsWith("left")) {
		styles.left = "10px";
	}
	if (location.endsWith("right")) {
		styles.right = "10px";
	}

	return styles;
}

export default function NotificationProvider(props) {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case "ADD_NOTIFICATION":
				const addContainer = state[action.location] || [];
				addContainer.push(action.payload);
				return { ...state, [action.location]: addContainer };
			case "REMOVE_NOTIFICATION":
				const removeContainer = state[action.payload.location] || [];
				return {
					...state,
					[action.payload.location]: removeContainer.filter(
						(el) => el.id !== action.payload.id
					),
				};
			default:
				return state;
		}
	}, {});

	return (
		<NotificationContext.Provider value={dispatch}>
			{Object.entries(state)
				.filter(
					([location, notifications]) => notifications.length !== 0
				)
				.map(([location, notifications]) => (
					<div
						key={location}
						style={handleNotificationLocation(location)}
						className={"notification-wrapper"}
						data-position={location}
					>
						{notifications.map((notification) => {
							return (
								<Notification
									dispatch={dispatch}
									key={notification.id}
									location={location}
									notification={notification}
								/>
							);
						})}
					</div>
				))}
			{props.children}
		</NotificationContext.Provider>
	);
}

export const useNotification = () => {
	const dispatch = useContext(NotificationContext);

	return (props) => {
		dispatch({
			type: "ADD_NOTIFICATION",
			location: checkLocationValidity(props.location)
				? props.location
				: "top-left",
			payload: {
				id: v4(),
				...props,
			},
		});
	};
};

function checkLocationValidity(location) {
	if (location == null) return false;

	if (
		location.startsWith("bottom-") ||
		location.startsWith("top-") ||
		location.endsWith("-right") ||
		location.endsWith("-left")
	)
		return true;

	return false;
}
