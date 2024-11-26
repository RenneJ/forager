import { View, Text, Button, TextInput, FlatList } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import { storeBasket, storeArea, clear, isStarted, parseStoredValue, storage } from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import SpotMarker from "../components/SpotMarker";

const database = getDatabase(app);
const now = new Date(Date.now());
const nowFormat = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`

export default function Forage({navigation}){
	const [area, setArea] = useState("");
	const [started, setStarted] = useState(false);
	const [basket, setBasket] = useState([]); // items that user puts in their basket
	const [name, setName] = useState("");
	// If useState is used, every time SpotMarker is rendered so would its parent Forage be rendered
	const basketItem = useRef({
		name: "",
		latitude: 0,
		longitude: 0
	});
	const changeRef=(value)=>{ basketItem.current=value }

	// TEMP HERE
	const clearStorage = () => {
		clear("basket");
		clear("area")
		setBasket([]);
		setStarted(false);
		changeRef(null);
	}

	const handleBasketAdd = () => {
		changeRef({...basketItem.current, name: name})
		setBasket([...basket, basketItem.current]);
		//changeRef(null);
	}

	const handleStart = () => {
		setStarted(true);
		storeArea("area", area);
	}

	const handleCoordinateChange = (latitude, longitude) => {
		changeRef({ latitude: latitude, longitude:longitude });
		//changeRef({ ...basketItem, longitude: longitude });
		if(basketItem.current){
			console.log("53", basketItem.current);
		}
	}

	// Switch Screen, foraging trip is still saved locally
	const handleEnd = () => {
		setStarted(false);
		navigation.navigate("Collections");
	}
	// Update local storage every time an item is added to basket.
	useEffect(() => {
		try {
			if (Object.values(basketItem.current).every((value) => value != "")) {
				storeBasket("basket", basketItem.current)
			}
		}catch (error) {
			console.log(error);
		}finally {
			setName("");
		}
	}, [basket])

	// check if there is ongoing foraging i.e. area is set
	useEffect(() => {
		try {
			getStoredBasket();
			setStarted(async () => await isStarted("area"));
		} catch(error) {
			console.log(error)
		}
	}, [])

	const getStoredBasket = async () => {
		try {
			console.log(await parseStoredValue("basket"))
			setBasket(... basket, await parseStoredValue("basket"))
		} catch(error) {
			console.log(error)
		}
	}

	return(
		<View style={styles.container}>
			<Text>FORAGE PAGE</Text>
			<Text>Current user: { auth.currentUser?.email }</Text>
			{started ?
				<View style={styles.container}>
					<TextInput
						placeholder="Mushroom name"
						value={name}
						onChangeText={text => setName(text)}
					/>
					<SpotMarker setCoordinates={handleCoordinateChange} basketItem={basketItem} />
					<Button title="Add to basket" onPress={handleBasketAdd} />
					<Button title="End Trip" onPress={handleEnd} />
					<Button title="Clear Storage" onPress={clearStorage} />
					<FlatList
						data={basket}
						renderItem={({item}) =>
							<Text>{ item.name }</Text>
						}
					/>
				</View>
				:
				<View styles={styles.container}>
					<TextInput
						placeholder="Area"
						value={area}
						onChangeText={text => setArea(text)}
					/>
					<Button title="Start Foraging" onPress={handleStart} />

				</View> }

		</View>
	)
}
