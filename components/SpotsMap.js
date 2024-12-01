import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Pressable } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import { storeBasket, storeArea, clear, isStarted } from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
// THIS IS COMPONENT OF COLLECTIONS
// SHOWING PRESSED TRIP'S SPOTS AND LABELS
export default function SpotsMap(props){
	const handleBack = () => {
		props.setMapVisible(false);
		props.setBasket([]);
	}

	return(
		<View style={styles.container}>
			<MapView
				style={styles.biggerMap}
				initialRegion={{
					latitude: props.basket[0].latitude,
					longitude: props.basket[0].longitude,
					latitudeDelta: 0.0322,
					longitudeDelta: 0.0221,
				}}
			>
				{props.basket.map(basketItem =>
					<Marker
						key={basketItem.id}
						title={ basketItem.name }
						coordinate={{ latitude: basketItem.latitude, longitude: basketItem.longitude }}
					/>
				)}
			</MapView>
			<Pressable
				style={{backgroundColor: "green", width: 100, height: 50, marginTop: 20}}
				onPress={ handleBack }
			>
				<Text>
					BACK
				</Text>
			</Pressable>
		</View>
	)
};
