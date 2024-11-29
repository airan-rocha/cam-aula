import {FlashMode, CameraRatio} from 'expo-camera';

export function setZoomCam(setZoom: React.Dispatch<React.SetStateAction<0 | 0.5 | 0.7 | 1>>) {
    setZoom(value => value == 0.0? 0.5 : value == 0.5? 0.7 : value == 0.7? 1 : 0.0)
}

export function setFlashCam(setFlashStatus: React.Dispatch<React.SetStateAction<FlashMode>>){
    setFlashStatus(value => value == 'auto'? 'off' : value == 'off'? 'on' : 'auto')
}

export function setRateCam(ratio: CameraRatio, setRatio: React.Dispatch<React.SetStateAction<CameraRatio>>, recordOn:boolean) {
    if(!recordOn){
        setRatio(value => ratio == '4:3'? '16:9' : '4:3');
    }
}