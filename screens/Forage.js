import { View, Text, Button, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import NetInfo from '@react-native-community/netinfo';
import { storeBasket, storeArea, removeItems, isStarted, parseStoredValue, fetchItem, setItem } from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import SpotMarker from "../components/SpotMarker";
import EndTripModal from "../components/EndTripModal";

export default function Forage({navigation}){
	const [area, setArea] = useState("");
	const [warning, setWarning] = useState("");
	const [started, setStarted] = useState(false);
	const [basket, setBasket] = useState([]); // items that user collects during their trip
	const [endModalVisible, setEndModalVisible] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [modalStyle, setModalStyle] = useState("");
	const [isConnected, setIsConnected] = useState(null)
	//	const [name, setName] = useState(null);
	const [error, setError] = useState("");
	// If useState is used, every time SpotMarker is rendered so would its parent
	const [basketItem, setBasketItem] = useState({
		name: null,
		latitude: null,
		longitude: null
	});
	/*const basketItem = useRef({
		name: null,
		latitude: null,
		longitude: null
		});*/
	const changeBasketItem=(value)=>{ basketItem.current=value }

	// TEMP HERE
	const clearStorage = () => {
		removeItems(["basket", "area"])
		setBasket([]);
		setStarted(false);
		setBasketItem({
			name: null,
			latitude: null,
			longitude: null
		});
	}

	const handleBasketAdd = () => {
		if (!basketItem.name || !basketItem.latitude || !basketItem.longitude) {
			// Don't handle empties
			// Notify user of erroneous input
		} else {
			setBasket([...basket, basketItem])
		}
	}

	useEffect(() => {
		// show modal
		// modal gets error message
		// if error message, show
		// else show what was added into basket
		// close button and timeout(5000)
		if (!basketItem.name || !basketItem.latitude || !basketItem.longitude) {
			setModalMessage("Input name and pin location.");
			setModalStyle("warning");
		} else {
			try {
				storeBasket("basket", basket)
					.then(setModalMessage(`${basketItem.name} and its location added to basket.`))
					.then(setModalStyle("success"))
					.catch(error => console.log("f65err",error.message))
			} catch (error) {
				setModalMessage(error);
				setModalStyle("error");
			} finally {
				setBasketItem({
					name: null,
					latitude: null,
					longitude: null
				});
				setAddModalVisible(true);
			}
		}
	}, [basket])

	const handleStart = () => {
		if (!area) {
			setWarning("Area is required.")
		} else {
			setItem("area", area);
			setStarted(true);
		}
	}

	const handleEnd = async () => {
		// check if internet connection
		NetInfo.fetch()
			.then(state => {
				setIsConnected(state.isInternetReachable) // boolean or null
			})
			.catch(error => {})
		// open modal
		setEndModalVisible(true);
	}

	// check if there is ongoing foraging on app start
	useEffect(() => {
		try {
			getStoredBasket();
			isStarted("area").then(resp => setStarted(resp));
			//fetchItem("area").then(resp => setArea(resp));
		} catch(error) {
			console.log("f83",error)
		}
	}, [])

	const getStoredBasket = async () => {
		try {
			await parseStoredValue("basket").then(resp => {
				if (resp) {
					setBasket(resp)
				}
			});
			await fetchItem("area").then(resp => setArea(resp));
		} catch(error) {
			console.log(error)
		}
	}

	const checkStorage = async () => {
		await fetchItem("area").then(resp => console.log("f101",typeof(resp), typeof(started)))
			.then(resp => { if (resp === null) { return false; } })
		return false
	}

	return(
    <KeyboardAvoidingView
    		style={ styles.container }
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
    >
			<ScrollView
				showVerticalScrollIndicator={ false }

			>
				{started == true ?
					<View>
						<SpotMarker basketItem={ basketItem } setBasketItem={ setBasketItem } />
						<TextInput
							placeholder="Mushroom name"
							value={ basketItem.name }
							onChangeText={text => setBasketItem({ ...basketItem, name:text })}
						/>
						<Button title="Clear Storage" onPress={ clearStorage } />
						<Button title="Add to basket" onPress={ handleBasketAdd } />
						<Button title="End Trip" onPress={ handleEnd } />
						<EndTripModal
							navigation={ navigation }
							isConnected={ isConnected }
							endModalVisible={ endModalVisible }
							setEndModalVisible= { setEndModalVisible }
						/>
						<AddedModal
							addModalVisible={ addModalVisible }
							setAddModalVisible= { setAddModalVisible }
							modalStyle={ modalStyle }
							modalMessage={ modalMessage }
						/>
					</View>
					:
					<View>
						<TextInput
							placeholder="Area"
							value={ area }
							onChangeText={text => setArea(text)}
						/>
						<Button title="Start Foraging" onPress={ handleStart } />
						{ warning && <Text style={ styles.requiredField }>{ warning }</Text>}
					</View> }

			</ScrollView>
    </KeyboardAvoidingView>
	)
}
