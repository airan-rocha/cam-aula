import {CameraView, CameraType, useCameraPermissions} from "expo-camera";
import {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CamView from "./src/components/CamView";

//passo 1 - importar
//passo 2 - configurar
//passo 3 - utilizar

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
    const [permision, requestPermission] = useCameraPermissions();
    const [hasPermission, setHasPerminssion] = useState<boolean>(false);

    // useEffect(() => {
    //   (async () => {
    //     console.log("Permission: ", permision);

    //     if(!permision){
    //       return <View />
    //     }

    //     if(!permision?.granted){
    //       await requestPermission();
    //     }

    //   })();
    // },[])

    const flipCamera = () => {
      setFacing((value) => value == "back" ? "front" : "back");
    };

  return (
    <View style={styles.container}>
      <CamView type={facing} onFlipCamera={flipCamera} />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
