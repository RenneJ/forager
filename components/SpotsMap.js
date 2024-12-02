import { View, Text, Pressable } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import styles from "../styles";

// THIS IS COMPONENT OF COLLECTIONS
// SHOWING PRESSED TRIP'S SPOTS AND LABELS
export default function SpotsMap(props){
	const handleBack = () => {
		props.setMapVisible(false);
		props.setBasket([]);
	}

	return(
		<View style={{flex: 1, gap: 30}}>
			<MapView
				style={styles.biggerMap}
				initialRegion={{
					latitude: props.basket[0].latitude,
					longitude: props.basket[0].longitude,
					latitudeDelta: 0.0322,
					longitudeDelta: 0.0221,
				}}
			>
				{props.basket.map(basketItem =>
					<Marker
						key={basketItem.id}
						title={ basketItem.name }
						coordinate={{ latitude: basketItem.latitude, longitude: basketItem.longitude }}
					/>
				)}
			</MapView>
			<Pressable
				style={[styles.button, styles.buttonClose]}
				onPress={ handleBack }
			>
				<Text style={styles.textStyle}>
					Back to list
				</Text>
			</Pressable>
		</View>
	)
};
