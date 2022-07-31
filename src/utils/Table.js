import { STAT_API_TO_ACTUAL_NAME_MAP } from "./statMap";
import { PRIORITY_ORDER } from "./statMap";

export default class Table {
	#rows = [];

	constructor(
		obj,
		firstColumn = "Season",
		keyMap = STAT_API_TO_ACTUAL_NAME_MAP
	) {
		this.#rows.push([firstColumn, ...Object.keys(Object.values(obj)[0])]);

		this.#rows[0] = this.#rows[0].map((key) => {
			return keyMap.getValue(key) || key;
		});

		Object.entries(obj).forEach(([season, seasonData]) => {
			this.#rows.push([season, ...Object.values(seasonData)]);
		});

		this.removeColumns("player_id", "season");
		this.sortColumns(PRIORITY_ORDER);
	}

	getRow(key) {
		return this.#rows.find((row) => row[0] === key);
	}

	getColumn(key) {
		const columnIndex = this.columnMap[key];
		return this.#rows.map((row) => row[columnIndex]);
	}

	getColumns(keys) {
		return keys.map((key) => this.getColumn(key));
	}

	get columnNames() {
		return this.#rows[0];
	}

	get rows() {
		return this.#rows.slice(1);
	}

	sortColumnItems(key) {
		// Reorder rows according to the key given, a particular column
		// Change rowNap
		const columnIndex = this.rows[0].findIndex(
			(colName) => colName === key
		);
		const number = typeof this.rows[1][columnIndex] === "number";

		const compareFunc = number ? integerCompare : stringCompare;

		this.rows.sort((row1, row2) => {
			const a = row1[columnIndex];
			const b = row2[columnIndex];
			return compareFunc(a, b);
		});
	}

	print() {
		console.table(this.#rows);
	}

	switchColumns(key1, key2) {
		const key1Index = this.getColumnIndex(key1);
		const key2Index = this.getColumnIndex(key2);

		this.#rows.forEach((row) => {
			const temp = row[key1Index];
			row[key1Index] = row[key2Index];
			row[key2Index] = temp;
		});
	}

	sortColumns(priorityMap) {
		let index = 1; // First column index
		priorityMap.forEach((key) => {
			const columnIndex = this.getColumnIndex(key);

			if (columnIndex === index) {
				index++;
				return;
			}
			this.switchColumns(key, this.#rows[0][index]);

			index++;
		});
	}

	getColumnIndex(key) {
		return this.#rows[0].findIndex((colName) => colName === key);
	}

	removeColumns(...keys) {
		keys.forEach((key) => {
			const columnIndex = this.getColumnIndex(key);
			if (columnIndex > -1)
				this.#rows.forEach((row) => row.splice(columnIndex, 1));
			else {
				console.log("Item not found");
			}
		});
	}

	get length() {
		return this.rows.length;
	}
}

function stringCompare(a, b) {
	a = a.toUpperCase();
	b = b.toUpperCase();
	integerCompare(a, b);
}

function integerCompare(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}
