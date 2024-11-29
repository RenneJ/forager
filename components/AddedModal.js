import React, {useState, useEffect} from 'react';
import {Alert, Modal, Image, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { storeInCloud } from '../utils/cloudstorage';
import styles from "../styles";

export default function AddedModal(props){
	let modalStyle;
	if(props.modalStyle === "success"){
		modalStyle = styles.modalSuccess;
	} else if (props.modalStyle === "warning"){
		modalStyle = styles.modalWarning;
	} else {
		modalStyle = styles.modalError;
	}

	useEffect(() => {
    setTimeout(() => {
    	props.setAddModalVisible(false);
  }, 2000);
}, [props.addModalVisible]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={ styles.centeredView }>
        <Modal
          animationType="none"
          transparent={true}
          visible={ props.addModalVisible }
          onRequestClose={() => {
            props.setAddModalVisible(!props.addModalVisible);
          }}>
          <View style={ styles.topView }>
            <View style={ [styles.modalView, modalStyle ] }>
							<Text>{ props.modalMessage }</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
