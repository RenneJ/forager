import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { removeItems, parseStoredValue, fetchItem} from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";

const database = getDatabase(app);
const now = new Date(Date.now());
const nowFormat = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

export const storeInCloud = async () => {
		try {
			const area = await fetchItem("area");
			const basket = await parseStoredValue("basket");
			if (basket && area) {
				push(ref(database, "collection/" + auth.currentUser.uid), {
					time: nowFormat,
					area: area,
					basket: basket
				});
				removeItems(["area", "basket"]);
			} else {
				console.log("Nothing to send.")
			}
		} catch (error) {
			console.log("cs27", error)
		}
}
