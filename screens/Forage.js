import { View, Text, Button, TextInput, FlatList } from "react-native";
import { useState, useEffect } from 'react';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import { storeBasket, storeArea, clear, isStarted } from "../utils/localstorage";
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
	const [basket, setBasket] = useState([]); //list of items here i.e. what a person puts in their basket
	const [item, setItem] = useState({
		name: "",
		lat: "",
		lon: ""
	});


	// TEMP HERE
	const clearStorage = () => {
		clear("basket");
		clear("area")
		setBasket([]);
		setStarted(false)
	}

	const handleBasketAdd = () => {
		setBasket([...basket, item]);
	}

	const handleStart = () => {
		setStarted(true);
		storeArea("area", area);
	}

	// Switch Screen, foraging trip is still saved locally
	const handleEnd = () => {
		setStarted(false);
		navigation.navigate("Collections");
	}
	// Update local storage every time an item is added to basket.
	useEffect(() => {
		try {
			storeBasket("basket", item)
		}catch (error) {
			console.log(error);
		}finally {
			setItem({...item, name: ""});
		}
	}, [basket])

	// check if there is ongoing foraging i.e. area is set
	useEffect(() => {
		try {
			started = async () => await isStarted("area")
		} catch(error) {
			console.log(error)
		} finally{console.log("f65", started)}
		}, [])

	return(
		<View style={styles.container}>
			<Text>FORAGE PAGE</Text>
			<Text>Current user: { auth.currentUser?.email }</Text>
			{started ?
				<View>
					<Text>{started}</Text>
					<TextInput
						placeholder="Mushroom name"
						value={item.name}
						onChangeText={text => setItem({ ...item, name: text })}
					/>
					<Text>MAP HERE, SELECT COORDS, PIN ON MAP</Text>
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
