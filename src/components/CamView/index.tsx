import {Button, Text, TouchableOpacity, View, Linking, Modal, Image } from 'react-native';
import {useState, useRef} from "react";
import {CameraView, useCameraPermissions} from "expo-camera";

import CameraViewProps from "./props";
import { styles } from './styles';

export default function CamView ({type, onFlipCamera}:CameraViewProps) {
    const cameRef = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    
    const [permission, requestPermission] = useCameraPermissions();
    const [zoom, setZoom] = useState<0.0 | 0.5 | 0.7 | 1>(0.0);
    const [torch, setTorch] = useState(false);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
      }
    
      if (!permission?.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
            <Text style={styles.message}>Nós precisamos da sua permissão para usar a camêra </Text>
            <Button onPress={requestPermission} title="Permitir" />
          </View>
        );
      }

      async function takePicture () {
        if(cameRef && cameRef.current){
          const data  = await cameRef.current.takePictureAsync();
          setCapturedPhoto(data.uri);
          setModalIsOpen(true);
          console.log(data.uri);
        }
      }


    return (
      <CameraView
        style={{flex: 1}} 
        facing={type} 
        ratio="4:3" 
        zoom={zoom}
        flash="auto"
        enableTorch={torch}
        autofocus='on'
        ref={cameRef}
        onCameraReady={() => console.log("ops! deu erro")}
      >
        <View style={styles.mainView}>
          <TouchableOpacity 
            style={styles.flipArea} 
            onPress={() => {onFlipCamera(); setZoom(0)}}
            // onPress={onFlipCamera}
          >
            <Text style={styles.flipText}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomArea} onPress={() => setZoom(value => value == 0.0? 0.5 : value == 0.5? 0.7 : value == 0.7? 1 : 0.0)}>
            <Text style={styles.zoomText}>{ zoom == 0.0? "1x" : zoom == 0.5? "5x" : zoom == 0.7? "7x" : "10x"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePictureArea} onPress={takePicture}>
            <Text style={styles.takePictureText}>( TP )</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.torchArea} onPress={() => setTorch(value => !value)}>
            <Text style={styles.torchText}>T-{torch ? "on" : "off"}</Text>
          </TouchableOpacity>
        </View>

        //condicional (tipo if) para renderizar o modal se o capturedPhoto não for nulo
        {capturedPhoto && (
          <Modal
          animationType='slide'
          transparent={false}
          visible={modalIsOpen}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
            }}
          >
            <TouchableOpacity
              style={{margin: 10}}
              onPress={() => setModalIsOpen(false)}
            >
              <Text>Close</Text>

            </TouchableOpacity>
            <Image
            style={{
              width: "100%",
              height: 300,
              borderRadius: 20,
            }} 
            source={{uri: capturedPhoto}}
            />
          </View>
        </Modal>
        )}
        
      </CameraView>
    )
}