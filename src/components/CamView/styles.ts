import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      message: {
        textAlign: 'center',
        paddingBottom: 10,
      },
    mainView: {
      flex: 1,
      backgroundColor: "transparent",
      flexDirection: "row",
    },
    flipArea: {
      position: "absolute",
      backgroundColor: '#00000094',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 50,
      bottom: 25,
      left: 20,
    },
    flipText: {
      textAlign: 'center',
    },
    takePictureArea: {
      position: "absolute",
      backgroundColor: '#00000094',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 50,
      bottom: 20,
      left: '43%',
    },
    takePictureText: {
      textAlign: 'center',
    },
    zoomArea: {
      position: "absolute",
      backgroundColor: '#00000094',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 50,
      top: 200,
      right: 10,
    },
    zoomText: {
      fontSize: 10,
      textAlign: 'center',
      color: "#fff",
    },
    flashArea: {
      position: "absolute",
      backgroundColor: '#00000094',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 50,
      top: 250,
      right: 10,
    },
    flashText: {
      fontSize: 10,
      textAlign: 'center',
      color: "#fff",
    },
    ratioArea: {
      position: "absolute",
      backgroundColor: '#00000094',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 50,
      top: 300,
      right: 10,
    },
    ratioText: {
      fontSize: 10,
      textAlign: 'center',
      color: "#fff",
    },
});