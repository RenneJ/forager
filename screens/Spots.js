import { View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";

const database = getDatabase(app);
// THIS IS A MAP SCREEN SHOWING ALL SPOTS WHERE USER HAS FORAGED
export default function Spots(){
	const [trips, setTrips] = useState([]);
	const [allForagedItems, setAllForagedItems] = useState([]);

	useEffect(() => {
		if (auth) {
			try {
				handleFetch();
			} catch (error) {
				console.log(error)
			}
		}
	}, []);

	useEffect(() => {
		let list = [];
		trips.forEach(trip => {
			trip.basket.forEach(basketItem => list.push(basketItem))
		});
		setAllForagedItems(list);
	}, [trips])

	const handleFetch = () => {
		const itemsRef = ref(database, "/collection/" + auth.currentUser.uid);
			onValue(itemsRef, (snapshot) => {
				const data = snapshot.val();
				if (data) {
					setTrips(Object.values(data));
				} else {
					setTrips([]);
				}
			});
	}

	return(
		<View style={styles.container}>
			<MapView
				style={styles.fullMap}
				initialRegion={{
					latitude: 60.200692,
					longitude: 24.934302,
					latitudeDelta: 0.0322,
					longitudeDelta: 0.0221,
				}}
			>
				{allForagedItems.map((item, index) =>
					<Marker
						key={ index }
						title={ item.name }
						description={ item.time }
						coordinate={{ latitude: item.latitude, longitude: item.longitude }}
					/>
				)}
			</MapView>
		</View>
	)
}
