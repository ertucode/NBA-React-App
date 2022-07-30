export default function removePlayerFromArray(array, index) {
	const newArray = [...array];
	newArray.splice(index, 1);
	return newArray;
}
