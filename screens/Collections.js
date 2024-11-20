import { View, Text, Button } from "react-native";
import { useState, useEffect } from 'react';
import { clear} from "../utils/localstorage";
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
			// TODO: parse loop
			const basketJSON = await storage.getItem("basket");
			const areaJSON = await storage.getItem("area");
			//console.log(basketJSON.replace("[", "'").replace("]", "'"));
			//var areaObject = JSON.parse(areaJSON.replace("[", "'").replace("]", "'"));
			//var basketObject = JSON.parse(basketJSON.replace("[", "'").replace("]", "'"));
			push(ref(database, "collection/" + auth.currentUser.uid), {
				time: nowFormat,
				area: areaJSON,
				basket: basketJSON
			});
			clearStorage();
		} catch(error){
			console.log("coll29", error)
		}
	}
	const clearStorage = () => {
		clear("basket");
		clear("area")
	}
	return(
		<View style={styles.container}>
			<Text>COLLECTIONS PAGE</Text>
			<Button title="Sync to cloud" onPress={handleSync} />
		</View>
	)
}
