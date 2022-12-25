import React, {useEffect} from 'react';
import {
  Image,
  PermissionsAndroid,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconApp from './iconWidget';
import {CameraOptions, launchCamera} from 'react-native-image-picker';

function ImageWidget({onPressImage, value}: ImageType) {
  useEffect(() => {
    requestCameraPermission();
    requestStoragePermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Meminta Izin Camera',
          message: 'Bolehkah Kami Akses Camera Kamu',
          buttonNeutral: 'Tanya Saya Nanti',
          buttonPositive: 'Ya',
          buttonNegative: 'Tidak',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return fail;
    }
  };
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Meminta Izin Storage',
          message: 'Bolehkah Kami Akses Storage Kamu',
          buttonNeutral: 'Tanya Saya Nanti',
          buttonPositive: 'Ya',
          buttonNegative: 'Tidak',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return fail;
    }
  };
  const selectFile = () => {
    const options: CameraOptions = {
      cameraType: 'back',
      mediaType: 'photo',
      maxHeight: 200,
      maxWidth: 200,
      includeBase64: true,
    };

    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('CAMERA = ', 'Penguna Batal Foto');
      } else if (res.errorCode) {
        console.log('CAMERA ERROR = ', res.errorCode);
      } else if (res.errorMessage) {
        console.log('CAMERA ERROR M = ', res.errorMessage);
      } else {
        onPressImage('data:image/png;base64,' + res.assets![0].base64);
      }
    });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={selectFile}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
          borderWidth: 1,
          alignItems: 'center',
        }}>
        {value ? (
          <Image
            source={{uri: value}}
            style={{height: 100, width: 100, borderRadius: 10}}
          />
        ) : (
          <IconApp name="camera" size={30} />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default ImageWidget;
