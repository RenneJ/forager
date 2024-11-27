import React, {useState, useEffect} from 'react';
import {Alert, Modal, Image, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { storeInCloud } from '../utils/cloudstorage';
import styles from "../styles";

export default function EndTripModal(props){
	const [uploading, setUploading] = useState(false);

		let bool;
	const handleCloudSave = async () => {
		setUploading(true);
		try {
			storeInCloud()
		} finally{
			console.log("sended")

		}
	}

	useEffect(() => {
  if (uploading) {
    setTimeout(() => {
    	setUploading(false);
			props.navigation.navigate("Collections");
  }, 1500);
  }
}, [uploading]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={props.endModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            props.setEndModalVisible(!props.endModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
          	{uploading ?
	         		<Image
								source={require("../assets/logo.png")}
								style={styles.accessLogo}
							 />
						:
							<View>
              <Text style={styles.modalText}>End trip</Text>
              { props.isConnected ?
	              <Pressable
	                style={[styles.button, styles.buttonClose]}
	                onPress={handleCloudSave}>
	                 <Text style={styles.textStyle}>Save</Text>
	              </Pressable>
							:
	              <Pressable
	                style={[styles.button, styles.buttonClose]}
	                onPress={() => props.setEndModalVisible(!props.endModalVisible)}>
	                 <Text style={styles.textStyle}>NO conn</Text>
	              </Pressable>
              }
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => props.setEndModalVisible(!props.endModalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
							</View>
           }
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
