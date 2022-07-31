export default function updateObjectKeys(object, keysMap) {
	const returnObject = {};
	Object.keys(object).forEach((key) => {
		const newKey = keysMap[key] || key;
		returnObject[newKey] = object[key];
	});
	return returnObject;
}
