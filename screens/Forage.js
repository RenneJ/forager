import { View, Text, TextInput, KeyboardAvoidingView, Pressable, ScrollView } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import NetInfo from '@react-native-community/netinfo';
import { storeBasket, storeArea, removeItems, isStarted, parseStoredValue, fetchItem, setItem } from "../utils/localstorage";
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import SpotMarker from "../components/SpotMarker";
import EndTripModal from "../components/EndTripModal";
import UserActionModal from "../components/UserActionModal";

export default function Forage({navigation}){
	const [area, setArea] = useState("");
	const [started, setStarted] = useState(false);
	const [basket, setBasket] = useState([]); // items that user collects during their trip
	const [endModalVisible, setEndModalVisible] = useState(false);
	const [actionModalVisible, setActionModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [modalStyle, setModalStyle] = useState("");
	const [isConnected, setIsConnected] = useState(null)
	const [basketItem, setBasketItem] = useState({
		name: null,
		latitude: null,
		longitude: null
	});

	const cleanUp = () => {
		removeItems(["basket", "area"])
		setArea("");
		setBasket([]);
		setBasketItem({
			name: null,
			latitude: null,
			longitude: null
		});
		setStarted(false);
	}

	const handleBasketAdd = () => {
		if (!basketItem.name || !basketItem.latitude || !basketItem.longitude) {
			// Don't handle empties
			// Notify user of erroneous input
			setModalStyle("warning");
			setModalMessage("Input name and pin location.");
			setActionModalVisible(true);
		} else {
			setBasket([...basket, basketItem])
		}
	}

	useEffect(() => {
		if (!basketItem.name || !basketItem.latitude || !basketItem.longitude) {
			setModalMessage("Input name and pin location.");
			setModalStyle("warning");
		} else {
			try {
				storeBasket("basket", basket)
				setModalMessage(`${basketItem.name} and its location added to basket.`);
				setModalStyle("success");
				setBasketItem({
					name: null,
					latitude: null,
					longitude: null
				});
			} catch (error) {
				setModalMessage(error);
				setModalStyle("error");
			} finally {
				setActionModalVisible(true);
			}
		}
	}, [basket])

	const handleStart = () => {
		if (!area) {
			setModalMessage("Area is required.");
			setModalStyle("warning");
			setActionModalVisible(true);
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

	return(
    <KeyboardAvoidingView
    	style={styles.container}
      behavior={ 'padding' }
    >
				{started === true ?

					<View style={styles.forageContainer}>
						<UserActionModal
							actionModalVisible={ actionModalVisible }
							setActionModalVisible= { setActionModalVisible }
							modalStyle={ modalStyle }
							setModalStyle={ setModalStyle }
							modalMessage={ modalMessage }
							setModalMessage={ setModalMessage }
						/>
						<View style={styles.mapContainer}>
							<SpotMarker basketItem={ basketItem } setBasketItem={ setBasketItem } />
						</View>
						<View style={styles.forageControls}>
						<TextInput
							style={styles.inputField}
							placeholder="Mushroom name"
							value={ basketItem.name }
							onChangeText={text => setBasketItem({ ...basketItem, name:text })}
						/>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={ handleBasketAdd }
						>
							<Text style={styles.textStyle}>
								Add to basket
							</Text>
						</Pressable>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={ handleEnd }
						>
							<Text style={styles.textStyle}>
								End Trip
							</Text>
						</Pressable>
						</View>
						<EndTripModal
							navigation={ navigation }
							isConnected={ isConnected }
							area={ area }
							reset={ cleanUp }
							endModalVisible={ endModalVisible }
							setEndModalVisible={ setEndModalVisible }
							setActionModalVisible={ setActionModalVisible }
							setModalStyle={ setModalStyle }
							setModalMessage={ setModalMessage }
						/>
					</View>

					:
					<View style={styles.areaControls}>
						<UserActionModal
							actionModalVisible={ actionModalVisible }
							setActionModalVisible= { setActionModalVisible }
							modalStyle={ modalStyle }
							setModalStyle={ setModalStyle }
							modalMessage={ modalMessage }
							setModalMessage={ setModalMessage }
						/>
						<TextInput
							style={styles.inputField}
							placeholder="Area"
							value={ area }
							onChangeText={text => setArea(text)}
						/>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={ handleStart }
						>
							<Text style={styles.textStyle}>
								Start Foraging
							</Text>
						</Pressable>
					</View>
				}

    </KeyboardAvoidingView>
	)
}
