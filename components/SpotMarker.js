import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import { storeBasket, storeArea, clear, isStarted } from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';

export default function SpotMarker({setCoordinates}){
	const [markerCoordinate, setMarkerCoordinate] = useState({
		latitude: 0,
		longitude: 0
	});

	return(
		<View>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 60.200692,
					longitude: 24.934302,
					latitudeDelta: 0.0322,
					longitudeDelta: 0.0221,
				}}
				onPress={event => {
					// Place marker here
					setMarkerCoordinate({ latitude: event.nativeEvent.coordinate.latitude, longitude: event.nativeEvent.coordinate.longitude});
					setCoordinates(
						event.nativeEvent.coordinate.latitude,
						event.nativeEvent.coordinate.longitude
					)
				}}
			>
					<Marker
						coordinate={{ latitude: markerCoordinate.latitude, longitude: markerCoordinate.longitude}}
					/>
			</MapView>
				<Button title="Pin pointer" onPress={()=>{}} />
		</View>
	)
};
