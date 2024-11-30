import { View, Text, Button, FlatList, ListEmptyComponent } from "react-native";
import { useState, useEffect } from 'react';
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";

export default function EmptyCollection(){
	return(
		<View>
			<Text>No foraging notes.</Text>
		</View>
	)
}
