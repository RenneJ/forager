import { View, Text, Button, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
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
	const [warning, setWarning] = useState("");
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
    	style={ styles.container }
      behavior={ 'padding' }
    >
				{started === true ?
			<ScrollView
				showVerticalScrollIndicator={ false }
			>
					<View style={styles.container}>
						<SpotMarker basketItem={ basketItem } setBasketItem={ setBasketItem } />
						<Button title="Add to basket" onPress={ handleBasketAdd } />
						<Button title="End Trip" onPress={ handleEnd } />
						<TextInput
							placeholder="Mushroom name"
							value={ basketItem.name }
							onChangeText={text => setBasketItem({ ...basketItem, name:text })}
						/>
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
						<UserActionModal
							actionModalVisible={ actionModalVisible }
							setActionModalVisible= { setActionModalVisible }
							modalStyle={ modalStyle }
							setModalStyle={ setModalStyle }
							modalMessage={ modalMessage }
							setModalMessage={ setModalMessage }
						/>
					</View>
			</ScrollView>
					:
					<View style={styles.areaControls}>
						<TextInput
							placeholder="Area"
							value={ area }
							onChangeText={text => setArea(text)}
						/>
						<Button title="Start Foraging" onPress={ handleStart } />
						{ warning && <Text style={ styles.requiredField }>{ warning }</Text>}
					</View> }

    </KeyboardAvoidingView>
	)
}
