export default function removePlayerFromArrayWithId(array, id) {
	return [...array].filter((element) => element.id !== id);
}
