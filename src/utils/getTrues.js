export default function getTrues(obj) {
	const trues = [];

	Object.entries(obj).forEach(([stat, bool]) => {
		if (bool) trues.push(stat);
	});
	return trues;
}
