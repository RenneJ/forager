import { View, Text, Button, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import NetInfo from '@react-native-community/netinfo';
import { storeBasket, storeArea, removeItems, isStarted, parseStoredValue, getItem, setItem } from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import SpotMarker from "../components/SpotMarker";
import EndTripModal from "../components/EndTripModal";

export default function Forage({navigation}){
	const [area, setArea] = useState("");
	const [warning, setWarning] = useState("");
	const [started, setStarted] = useState(false);
	const [basket, setBasket] = useState([]); // items that user puts in their basket
	const [endModalVisible, setEndModalVisible] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [isConnected, setIsConnected] = useState(null)
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	// If useState is used, every time SpotMarker is rendered so would its parent
	const basketItem = useRef({
		name: "",
		latitude: 0,
		longitude: 0
	});
	const changeBasketItem=(value)=>{ basketItem.current=value }

	// TEMP HERE
	const clearStorage = () => {
		removeItems(["basket", "area"])
		setBasket([]);
		setStarted(false);
		changeBasketItem(null);
	}

	const handleBasketAdd = () => {
		// show modal
		// modal gets error message
		// if error message, show
		// else show what was added into basket
		// close button and timeout(5000)
		try {
			changeBasketItem({ ...basketItem.current, name: name})
			setBasket([...basket, basketItem.current]);
			setAddModalVisible(true);
			//
		} catch(error){

		}
		//changeBasketItem(null);
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
		changeBasketItem({ name: name, latitude: latitude, longitude:longitude });
		//changeBasketItem({ ...basketItem, longitude: longitude });
		if(basketItem.current){
			console.log("53", basketItem.current);
		}
	}

	// Switch Screen, foraging trip is still saved locally

	const handleEnd = async () => {
		// check if internet connection
		NetInfo.fetch()
			.then(state => {
				setIsConnected(state.isInternetReachable) // boolean or null
			})
			.catch(error => {})
		// open modal
		setEndModalVisible(true);
		// and storeInCloud
	}
	// Update local storage every time an item is added to basket.
	useEffect(() => {
		try {
			storeBasket("basket", basketItem.current)
				.catch(error => setError(error.message))
		}catch (error) {
			console.log("f73",error);
		}finally {
			setName("");
			// reset pin
		}
	}, [basket])

	// check if there is ongoing foraging on app start
	useEffect(() => {
		try {
			getStoredBasket();
			isStarted("area").then(resp => setStarted(resp));
			//getItem("area").then(resp => setArea(resp));
		} catch(error) {
			console.log("f83",error)
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

	const checkStorage = async () => {
		await getItem("area").then(resp => console.log("f101",typeof(resp), typeof(started)))
			.then(resp => { if (resp === null) { return false; } })
		return false
	}

	return(
    <KeyboardAvoidingView
    		style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
			<ScrollView
				showVerticalScrollIndicator={false}

			>
				{started == true ?
					<View>
						<SpotMarker setCoordinates={handleCoordinateChange} basketItem={basketItem} />
						<TextInput
							placeholder="Mushroom name"
							value={name}
							onChangeText={text => setName(text)}
						/>
						<Button title="Clear Storage" onPress={clearStorage} />
						<Button title="Add to basket" onPress={handleBasketAdd} />
						<Button title="End Trip" onPress={handleEnd} />
						<EndTripModal
							navigation={navigation}
							isConnected={ isConnected }
							endModalVisible={ endModalVisible }
							setEndModalVisible= {setEndModalVisible} />
					</View>
					:
					<View>
						<TextInput
							placeholder="Area"
							value={area}
							onChangeText={text => setArea(text)}
						/>
						<Button title="Start Foraging" onPress={handleStart} />
						{warning && <Text style={styles.requiredField}>{warning}</Text>}
					</View> }

			</ScrollView>
    </KeyboardAvoidingView>
	)
}
