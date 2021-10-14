const getColor = (percent = 0) => {
	if (percent > 60) return '#FE76B1';
	else if (percent > 30) return '#E8FF69';
	else if (percent > 0) return '#3AB7D3';
	else return '#FF6961';
};
const getSize = (percent = 0) => {
	if (percent > 60) return 25;
	else if (percent > 30) return 20;
	else if (percent > 0) return 15;
	else return 10;
};
module.exports = {
	getColor,
	getSize,
};
