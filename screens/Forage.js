import { View, Text, Button, TextInput, FlatList } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import { storeBasket, storeArea, clear, isStarted } from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import SpotMarker from "../components/SpotMarker";

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
	const [name, setName] = useState("");
	// Pass coordinates here from child component (SpotMarker)
	// to avoid too many re-renders (infinite loop)
	const ref = useRef({
		name: "",
		lat: "",
		lon: ""
	});
	const changeRef=(value)=>{ ref.current=value }

	// TEMP HERE
	const clearStorage = () => {
		clear("basket");
		clear("area")
		setBasket([]);
		setStarted(false);
		changeRef(null);
	}

	const handleBasketAdd = () => {
		changeRef({...ref.current, name: name})
		setBasket([...basket, ref.current]);
		//changeRef(null);
	}

	const handleStart = () => {
		setStarted(true);
		storeArea("area", area);
	}

	const handleCoordinateChange = (lat, lon) => {
		changeRef({ lat: lat, lon:lon });
		//changeRef({ ...ref, lon: lon });
		if(ref.current){
			console.log("53", ref.current);
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
			if (Object.values(ref.current).every((value) => value != "")) {
				storeBasket("basket", ref.current)
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
				<View style={styles.container}>
					<TextInput
						placeholder="Mushroom name"
						value={name}
						onChangeText={text => setName(text)}
					/>
					<SpotMarker setCoordinates={handleCoordinateChange} />
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
