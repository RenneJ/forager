import { View, Text, Button, TextInput, FlatList } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import { storeBasket, storeArea, clear, isStarted, parseStoredValue, getItem, setItem } from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import SpotMarker from "../components/SpotMarker";

export default function Forage({navigation}){
	const [area, setArea] = useState("");
	const [warning, setWarning] = useState("");
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
		setBasket([... basket, basketItem.current]);
		//changeRef(null);
	}

	const handleStart = () => {
		if (!area) {
			setWarning("Area is required.")
		} else {
			setItem("area", area);
			setStarted(true);
		}
	}

	const handleCoordinateChange = (latitude, longitude) => {
		changeRef({ name: name, latitude: latitude, longitude:longitude });
		//changeRef({ ...basketItem, longitude: longitude });
		if(basketItem.current){
			console.log("53", basketItem.current);
		}
	}

	// Switch Screen, foraging trip is still saved locally
	const handleEnd = () => {
		//setStarted(false);
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

	// check if there is ongoing foraging
	useEffect(() => {
		try {
			getStoredBasket();
			isStarted("area").then(resp => setStarted(resp));
			getItem("area").then(resp => setArea(resp));
		} catch(error) {
			console.log(error)
		}
	}, [])

	const getStoredBasket = async () => {
		try {
			await parseStoredValue("basket").then(resp => {
				if (resp) {
					setBasket(...basket, resp)
				}
			});
			await getItem("area").then(resp => setArea(resp));
		} catch(error) {
			console.log(error)
		}
	}

	return(
		<View style={styles.container}>
			{started == true ?
				<View style={styles.container}>
					<SpotMarker setCoordinates={handleCoordinateChange} basketItem={basketItem} />
					<Button title="Add to basket" onPress={handleBasketAdd} />
					<Button title="End Trip" onPress={handleEnd} />
					<Button title="Clear Storage" onPress={clearStorage} />
					<TextInput
						placeholder="Mushroom name"
						value={name}
						onChangeText={text => setName(text)}
					/>
					<FlatList
						ListHeaderComponent={area && <Text style={styles.listHeader}>{area}</Text>}
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
					{warning && <Text style={styles.requiredField}>{warning}</Text>}
				</View> }

		</View>
	)
}
