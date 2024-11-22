import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import { storeBasket, storeArea, clear, isStarted } from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';

export default function SpotMarker({setCoordinates}){

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
			onPress={event =>
				// Place marker here
				setCoordinates(
					event.nativeEvent.coordinate.latitude,
					event.nativeEvent.coordinate.longitude
				)}
		/>
			<Button title="Pin pointer" onPress={()=>{}} />
		</View>
	)
};
