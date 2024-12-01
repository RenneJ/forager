import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#8ed4a5',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
	credentialInput: {
		height: 40,
	},
  drawer: {
		backgroundColor: "#8ed4a5",

  },
  drawerItem: {
	  drawerActiveBackgroundColor: "#dfebdf",
	  drawerActiveTintColor: "#1f471f",
		drawerLabelStyle: {
      color: "#1f471f",
      fontSize: 20,
    },
  },
  warning: {
  	color: "red",
  },
  accessLogo: {
  	height: 150,
   	width: 150,
  },
  drawerLogout: {
		color: "#d10f0f",
		fontSize: 16,
		margin: "auto"
  },
  map: {
  	width: Dimensions.get('window').width * 1,
   	height: Dimensions.get('window').height * 0.5,
  },
  biggerMap: {
 		width: Dimensions.get('window').width * 1,
  	height: Dimensions.get('window').height * 0.8,
  },
  listHeader: {

  },
  requiredField: {

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalWarning: {
  	backgroundColor: "yellow",
  },
  modalError: {

  },
  modalSuccess: {
  	backgroundColor: "#70db95",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {

  },
  topView: {
  	flex: 0.6,
	  justifyContent: 'center',
	  alignItems: 'center',
  },
  pressableListItem: {
  	backgroundColor: "#dfebdf",
  	width: Dimensions.get('window').width *0.95,
   	padding: 10,
  	borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#215231",
		borderRadius: 5,
		elevation: 10,	/* Android only */
  },
  tripLabel: {
		fontSize: 18,
		color: "#1f471f",
  },
  tripBasketContent: {
  	flex: 1,
   	flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
})

export default styles;
