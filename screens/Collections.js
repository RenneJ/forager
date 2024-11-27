import { View, Text, Button, FlatList } from "react-native";
import { useState, useEffect } from 'react';
import { clear, parseStoredValue, getItem} from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";

const database = getDatabase(app);

export default function Collections(){
	// TODO: if wifi do storeInCloud
	// TODO: list previous trips (sort by time: desc)
	// TODO: "Go Forage" -> Forage
	const [trips, setTrips] = useState([]);
	const [docs, setDocs] = useState({});
	useEffect(() => {
		if (auth) {
			try {
				const itemsRef = ref(database, "/collection/" + auth.currentUser.uid);
				onValue(itemsRef, (snapshot) => {
					const data = snapshot.val();
					if (data) {
						setTrips(Object.values(data));
						setDocs(data);
						console.log(data)
					} else {
						setTrips([]);
					}
				});
			} catch(error) {
				console.log("c29", error)
			} finally {
				console.log("c33",trips)
			}
		}
	}, []);

	return(
		<View style={styles.container}>
			<View style={styles.collectionList}>
			<FlatList
				data={trips}
				renderItem={({ item }) =>
					<Text>{item.area}, {item.time}</Text>
				}
			/>
			</View>
		</View>
	)
}
