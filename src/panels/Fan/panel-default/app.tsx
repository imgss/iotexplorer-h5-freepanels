import React from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { FanPanel } from './FanPanel';
import { entryWrap } from "@src/entryWrap";

function App() {
	const [{
		deviceInfo,
		deviceData,
		productInfo,
		templateMap,
		offline,
		powerOff,
	}, { doControlDeviceData }] = useDeviceInfo();

	return (
		<FanPanel
			deviceInfo={deviceInfo}
			productInfo={productInfo}
			templateMap={templateMap}
			deviceData={deviceData}
			offline={offline}
			powerOff={powerOff}
			doControlDeviceData={doControlDeviceData}
		/>
	);
}

entryWrap(App);
