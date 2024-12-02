import { View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import styles from "../styles";

export default function SpotMarker(props){
	return(
		<View>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 60.200692,
					longitude: 24.934302,
					latitudeDelta: 0.0322,
					longitudeDelta: 0.0221,
				}}
				onPress={event => {
					props.setBasketItem({
						...props.basketItem,
						latitude: event.nativeEvent.coordinate.latitude,
						longitude: event.nativeEvent.coordinate.longitude
					});
				}}
			>
				{props.basketItem.latitude &&
					<Marker
						coordinate={{ latitude: props.basketItem.latitude, longitude: props.basketItem.longitude }}
					/>
				}
			</MapView>
		</View>
	)
};
