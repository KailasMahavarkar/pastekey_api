import { NonEmptyArray } from "../types/types";

function Ulility() {
	const arraySizeKB = (array: NonEmptyArray<string>) => {
		return array.map((x) => x.length / 1024).reduce((a, b) => a + b, 0);
	};

	const arraySizeMB = (array: NonEmptyArray<string>) => {
		return arraySizeKB(array) / 1024;
	};

	return {
		arraySizeKB,
		arraySizeMB,
	};
}

const util = Ulility();
export default util;
