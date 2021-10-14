import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import Pin from './Pin';
import Loading from './Loading';
import PopupData from './PopupData';
import getCovidData from './getCovidData';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const MAPBOX_TOKEN = `pk.eyJ1IjoiZGV3YW5zaDU5IiwiYSI6ImNrdGVpMjlzdTJwY2kyempwandvaHQzM3cifQ.yc9fBAwFW8oQNS66EGHeYg`;
function Vaccine() {
	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 3,
		mapboxApiAccessToken: MAPBOX_TOKEN,
	});
	const [popupInfo, setPopupInfo] = useState(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const getLocation = () => {
		navigator.geolocation.getCurrentPosition(gotLocationPermission, noLocationPermission);
	};
	const gotLocationPermission = (position) => {
		const { latitude, longitude } = position.coords;
		setViewport({ ...viewport, latitude, longitude });
	};
	const noLocationPermission = async () => {
		const response = await fetch(`https://ipapi.co/json`);
		const body = await response.json();
		const { latitude, longitude } = body;
		setViewport({ ...viewport, latitude, longitude });
	};
	const handleClick = (index) => {
		setPopupInfo(data[index]);
	};
	useEffect(() => {
		getCovidData(setData, setLoading);
		getLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<ReactMapGL
			{...viewport}
			mapStyle='mapbox://styles/mapbox/dark-v9'
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
		>
			{data &&
				data.map((countryData, i) => (
					<div key={i} onMouseEnter={() => handleClick(i)} onClick={() => handleClick(i)}>
						<Marker
							longitude={countryData.longitude}
							latitude={countryData.latitude}
							offsetTop={-20}
							offsetLeft={-10}
						>
							<Pin size={countryData.size} color={countryData.color} />
						</Marker>
					</div>
				))}
			{popupInfo && (
				<Popup
					tipSize={5}
					anchor='top'
					dynamicPosition={true}
					longitude={popupInfo.longitude}
					latitude={popupInfo.latitude}
					closeOnClick={true}
					onClose={setPopupInfo}
				>
					<PopupData popupInfo={popupInfo} />
				</Popup>
			)}
			{loading && <Loading />}
		</ReactMapGL>
	);
}

export default Vaccine;
