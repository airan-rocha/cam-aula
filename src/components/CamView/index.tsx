import {useState, useRef} from "react";
import {Button, Text, TouchableOpacity, View, Linking, Modal, Image } from 'react-native';

import {CameraView, ImageType} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './styles';
import CameraViewProps from "./props";

export default function CamView ({type, onFlipCamera}:CameraViewProps) {
    const cameRef = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const imageType : ImageType = 'png';

    const options = {quality: 1, imageType: imageType }
    

    const [zoom, setZoom] = useState<0.0 | 0.5 | 0.7 | 1>(0.0);
    const [torch, setTorch] = useState(false);


      async function takePicture () {
        if(cameRef && cameRef.current){
          const data  = await cameRef.current.takePictureAsync(options);
          setCapturedPhoto(data.uri);
          setModalIsOpen(true);
          console.log(data);
        }
      }

      async function savePicture () {
        if (capturedPhoto != null){
          MediaLibrary.saveToLibraryAsync(capturedPhoto).then(() => {
            setCapturedPhoto(null);
          });
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
        // onCameraReady={() => console.log("ops! deu erro")}
      >
        <View style={styles.mainView}>
          <TouchableOpacity 
            style={styles.flipArea} 
            onPress={() => {onFlipCamera(); setZoom(0)}}
            // onPress={onFlipCamera}
          >
            <Text style={styles.flipText}><MaterialIcons name="cameraswitch" size={32} color="#ffffff" /></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePictureArea} onPress={takePicture}>
            <Text style={styles.takePictureText}><MaterialIcons name="photo-camera" size={32} color="#ffffff" /></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomArea} onPress={() => setZoom(value => value == 0.0? 0.5 : value == 0.5? 0.7 : value == 0.7? 1 : 0.0)}>
            <Text style={styles.zoomText}><MaterialIcons name="zoom-in" size={32} color="#ffffff" />{ zoom == 0.0? "1x" : zoom == 0.5? "5x" : zoom == 0.7? "7x" : "10x"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.torchArea} onPress={() => setTorch(value => !value)}>
            <Text style={styles.torchText}><MaterialIcons name={torch ? "flashlight-on" : "flashlight-off"} size={32} color="#ffffff" /></Text>
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
            <Image
              style={{
                width: "100%",
                height: 450,
                borderRadius: 20,
              }} 
              source={{uri: capturedPhoto}}
            />
            <View style={{ flexDirection: 'row'}}>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={() => setModalIsOpen(false)}
              >
                <Text><MaterialIcons name="close" size={34} color="black" /></Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={savePicture}
              >
                <Text><MaterialIcons name="save-alt" size={34} color="black" /></Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        )}
        
      </CameraView>
    )
}