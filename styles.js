import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  credentialInput: {
  	height: 40,

  },
  warning: {
  	color: "red",
  },
  accessLogo: {
  	height: 150,
   	width: 150,
  },
  drawerLogout: {

  },
  map:{
  	width: Dimensions.get('window').width * 0.9,
   	height: Dimensions.get('window').height * 0.5,
  }
})

export default styles;
