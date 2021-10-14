import React from 'react';

function PopupData({ popupInfo }) {
	const {
		country,
		iso2,
		data: {
			date,
			daily_vaccinations,
			people_fully_vaccinated,
			people_fully_vaccinated_per_hundred,
			people_vaccinated,
			people_vaccinated_per_hundred,
		},
	} = popupInfo;
	return (
		<div>
			<div>{`Date: ${date}`}</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{`Country: ${country}`}
				<img src={`https://www.countryflags.io/${iso2}/flat/32.png`} alt='' />
			</div>
			<div>{`Daily Vaccinations: ${daily_vaccinations}`}</div>
			<div>{`people Vaccinated: ${people_vaccinated}`}</div>
			<div>{`People Vaccinated %: ${people_vaccinated_per_hundred} %`}</div>
			<div>{`People Fully Vaccinated: ${people_fully_vaccinated}`}</div>
			<div>{`People Fully Vaccinated %: ${people_fully_vaccinated_per_hundred} %`}</div>
		</div>
	);
}

export default PopupData;
