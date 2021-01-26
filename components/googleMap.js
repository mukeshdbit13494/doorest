import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { useState } from 'react';

function GoogleMap(props) {
	const [ state, setState ] = useState({
		showingInfoWindow: true,
		activeMarker: {},
		selectedPlace: {}
	});

	const onMarkerClick = (props, marker, e) =>
		setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});

	const onClose = (props) => {
		if (state.showingInfoWindow) {
			setState({
				showingInfoWindow: false,
				activeMarker: {},
				selectedPlace: {}
			});
		}
	};
	return (
		<div>
			<Map
				google={props.google}
				zoom={18}
				style={props.style}
				initialCenter={{
					lat: props.lat,
					lng: props.long
				}}
			>
				<Marker
					onClick={onMarkerClick}
					name={'Hello, I am here'}
					draggable={props.draggable}
					onDragend={(event, map, coords) =>
						props.coordinates({
							latitude: coords.latLng.lat(),
							longitude: coords.latLng.lng()
						})}
				/>
				<InfoWindow marker={state.activeMarker} visible={state.showingInfoWindow} onClose={onClose}>
					<div>
						<h4>{state.selectedPlace.name}</h4>
					</div>
				</InfoWindow>
			</Map>
		</div>
	);
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBphzvxTbS3py2Arew4XFKkQuUV6AERizk'
})(GoogleMap);
