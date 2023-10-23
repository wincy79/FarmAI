export function shuffleArr(arr) {
	return arr
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
}

export function getRandomInt(max) {
	const maxNum = max + 1;
	return Math.floor(Math.random() * maxNum);
}

export const getStatesList = (data) => {
	const dataArr = Object.keys(data);
	return dataArr.reduce((acc, curr) => {
		acc.push({ name: curr, value: curr });
		return acc;
	}, []);
};

export const getCities = (value, data) => {
	const dataArr = data?.[value];
	return dataArr?.reduce((acc, curr) => {
		acc.push({ name: curr, value: curr });
		return acc;
	}, []);
};
