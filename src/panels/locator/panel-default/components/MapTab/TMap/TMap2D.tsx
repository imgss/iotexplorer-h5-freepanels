import React, { useEffect, useRef } from 'react';
import { TMapApiKey } from '../../../constants';

import './TMap2D.less';

const InitCallbackFuncName = 'IotExplorerLocatorPanelMapInit';
interface TMap2DProps {
  getInitOptions: (qqMaps: any) => object;
  onInited?: ({ map, qqMaps }) => void;
}

export function TMap2D({
  getInitOptions,
  onInited,
}: TMap2DProps) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const mapScriptParent = window.document.head;
    if (mapContainerRef.current && mapScriptParent) {
      const mapContainer = mapContainerRef.current;

      window[InitCallbackFuncName] = () => {
        delete window[InitCallbackFuncName];

        const qqMaps = window['qq'] && window['qq']['maps'];
        if (qqMaps) {
          const initOptions = getInitOptions ? getInitOptions(qqMaps) : {};
          const map = new qqMaps.Map(mapContainer, initOptions);

          mapInstanceRef.current = map;
  
          if (onInited) {
            onInited({ map, qqMaps });
          }
        } else {
          console.error('tmap init fail: missing window.qq.maps');
        }
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://map.qq.com/api/js?v=2.exp&key=${TMapApiKey}&callback=${InitCallbackFuncName}`;
      mapScriptParent.appendChild(script);
    }
  }, []);

  return (
    <div className="locator-map-container" ref={mapContainerRef} />
  );
}
