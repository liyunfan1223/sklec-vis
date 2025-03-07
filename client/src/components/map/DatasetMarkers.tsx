import * as React from 'react';
import {LayerGroup, LayersControl, Marker, Popup} from 'react-leaflet';
import DataMarkerPopupContent from '@/components/map/DataMarkerPopupContent';
import L, {DivIcon, Icon} from 'leaflet';
import {renderToStaticMarkup} from 'react-dom/server';
import {FilePresent} from '@mui/icons-material';
import useAxios from 'axios-hooks';
import {useAppDispatch} from '@/app/hooks';
import {uiSlice} from '@/store/uiSlice';
import {useEffect} from 'react';
import {Simulate} from 'react-dom/test-utils';
import load = Simulate.load;
import {siteSlice} from '@/store/siteSlice';

export interface IDatasetMarkersProps {
}

export const markerIcons = {
  greenFolder: new DivIcon({
    html: renderToStaticMarkup(
        <FilePresent sx={{color: '#71d0b8'}} />,
    ),
  }),
  redCircle: new Icon({
    iconUrl: '/img/markers/marker-red.png',
    iconRetinaUrl: '/img/markers/marker-red@2x.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  }),
  cyanCircle: new Icon({
    iconUrl: '/img/markers/marker-cyan.png',
    iconRetinaUrl: '/img/markers/marker-cyan@2x.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  }),
};

const DatasetMarkers = (props: IDatasetMarkersProps) => {
  const [{data, loading, error}, refetch] = useAxios('/api/dataset/');
  const dispatch = useAppDispatch();
  const center = new L.LatLng(31.167777777777778, 122.2182222);
  const ADCPMetaData = {
    'Instrument': '201283',
    'Sensors': 'Serial K175067, Channel 1',
    'Sampling Period': '10000',
    'Longtitude': '122˚13\'5.60"',
    'Latitude': '31˚04\'4.00"',
  };

  const CTD = {
    'Instrument': '201283',
    'Sensors': 'Serial K175067, Channel 1',
    'Sampling Period': '10000',
    'Longtitude': '122˚13\'5.60"',
    'Latitude': '31˚04\'4.00"',
  };

  useEffect(() => {
    if (loading) {
      dispatch(uiSlice.actions.beginLoading('Loading datasets...'));
    } else {
      dispatch(uiSlice.actions.endLoading());
    }
    if (error) {
      dispatch(uiSlice.actions.openSnackbar({
        message: 'Error fetching dataset list.' + error && error.message || 'Unknown error.',
        severity: 'error',
      }));
    }
    if (data) {
      dispatch(siteSlice.actions.setDatasetListCache(data.results));
    }
  }, [loading, error, data]);

  if (!data) {
    return null;
  }

  const markers = data.results.map((one: any) => {
    const center = new L.LatLng(one.latitude, one.longitude);
    return (
      <Marker position={[one.latitude, one.longitude]} key={one.uuid} icon={markerIcons.redCircle}>
        <Popup>
          <DataMarkerPopupContent name={one.name} link={`/view/${one.uuid}`} description={one.description} meta={one.meta_data} />
        </Popup>
      </Marker>
    );
  });
  return (
    <LayersControl.Overlay name={'Dataset List'} checked={true}>
      <LayerGroup>
        <Marker position={center} icon={markerIcons.cyanCircle}>
          <Popup>
            <DataMarkerPopupContent name={'ADCP_202009-10'} meta={ADCPMetaData} link={'/view/1'}></DataMarkerPopupContent>
            <DataMarkerPopupContent name={'CTD_201283_20201111_1520'} meta={ADCPMetaData} link={'/view/2'}></DataMarkerPopupContent>
          </Popup>
        </Marker>
        {markers}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export default DatasetMarkers;
