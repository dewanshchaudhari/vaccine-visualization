import React from 'react';
import loadingSvg from './loading.svg';
function Loading() {
	return <img src={loadingSvg} alt='loading' style={{ width: '30px', height: 'auto' }} />;
}

export default Loading;
