import { View, Text, Button, TextInput } from "react-native";
import { useState } from 'react';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';

const database = getDatabase(app);
const now = new Date(Date.now());
const nowFormat = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`

export default function Forage({navigation}){
	// TODO: "Add to Basket", collect inputs: name, location (pin on map)
	// TODO: save locally, when internet connection send to firebase
	// TODO: save uid locally
	const [area, setArea] = useState("");
	const [started, setStarted] = useState(false);
	const [basket, setBasket] = useState({});
	const handleSave = () => {
		push(ref(database, "collection/" + auth.currentUser.uid), {
			time: nowFormat,
			area: "Nuuksio",
			basket: "basket"
		});
	}

	const handleDate = () => {
		console.log(nowFormat)
	}
	return(
		<View style={styles.container}>
			<Text>FORAGE PAGE</Text>
			<Text>Current user: { auth.currentUser?.email }</Text>
			<View styles={styles.container}>
				<TextInput placeholder="Area"/>
			</View>
			<Button title="Test Save" onPress={handleSave} />
			<Button title="Test Date" onPress={handleDate} />
		</View>
	)
}
