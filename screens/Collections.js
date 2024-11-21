import { View, Text, Button } from "react-native";
import { useState, useEffect } from 'react';
import { clear, parseStoredValue} from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import { auth, app, storage } from "../firebaseconfig";
import styles from "../styles";

const database = getDatabase(app);
const now = new Date(Date.now());
const nowFormat = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`

export default function Collections(){
	// TODO: list previous trips (sort by time: desc)
	// TODO: "Go Forage" -> Forage
	const handleSync = async () => {
		try {
			const area = await storage.getItem("area");
			const basket = await parseStoredValue("basket");
			if (basket && area) {
				push(ref(database, "collection/" + auth.currentUser.uid), {
					time: nowFormat,
					area: area,
					basket: basket
				});
				clearStorage();
			} else {
				console.log("Nothing to send.")
			}
		} catch(error){
			console.log("coll29", error)
		}
	}
	const clearStorage = () => {
		clear("basket");
		clear("area")
	}

	const handleParse = async () => {
		const basket = await parseStoredValue("area");
	}

	return(
		<View style={styles.container}>
			<Text>COLLECTIONS PAGE</Text>
			<Button title="Sync to cloud" onPress={handleSync} />
			<Button title="PARSE TEST" onPress={handleParse} />
		</View>
	)
}
