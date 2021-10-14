import React from 'react';

function Pin({ size, color }) {
	return (
		<>
			<svg width={size} height={size} viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<circle cx='100' cy='100' r='100' fill={color} />
			</svg>
		</>
	);
}

export default Pin;
