import getPlayerName from "./getPlayerName";

export default function getPlayerIndexFromDesiredPlayers(array, playerName) {
	console.log(array);

	return array.findIndex(
		(playerObject) => getPlayerName(playerObject.player) === playerName
	);
}
