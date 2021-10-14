const COVID_API = `https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json`;
const countries = require('./countries.json');
const { getColor, getSize } = require('./utils');
const getCovidData = async (setData, setLoading) => {
	const response = await fetch(COVID_API);
	const body = await response.json();
	const covidData = [];
	countries.forEach((country) => {
		for (let i = 0; i < body.length; i++) {
			if (body[i].iso_code === country.Alpha3) {
				const len = body[i].data.length - 1;
				let dataIndex = body[i].data.length - 1;
				for (let j = len; j >= 0; j--) {
					if (body[i].data[j]?.people_fully_vaccinated_per_hundred !== undefined) {
						dataIndex = j;
						break;
					}
				}
				covidData.push({
					iso2: country.Alpha2,
					iso: body[i].iso_code,
					country: body[i].country,
					data: body[i].data[dataIndex],
					latitude: country.Latitude,
					longitude: country.Longitude,
					color: getColor(body[i].data[dataIndex]?.people_fully_vaccinated_per_hundred),
					size: getSize(body[i].data[dataIndex]?.people_fully_vaccinated_per_hundred),
				});
				break;
			}
		}
	});
	setData(covidData);
	setLoading(false);
};

export default getCovidData;
