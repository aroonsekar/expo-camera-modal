import React, { useState, useRef, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Modal, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Icon from 'react-native-feather';
import styles from './CameraStyles';

const GridOverlay = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <View style={[styles.gridLine, { top: '33.33%' }]} />
    <View style={[styles.gridLine, { top: '66.66%' }]} />
    <View style={[styles.gridLine, { left: '33.33%', width: 1, height: '100%' }]} />
    <View style={[styles.gridLine, { left: '66.66%', width: 1, height: '100%' }]} />
  </View>
);

const CameraModal = ({ visible, onClose, onPictureTaken }) => {
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  
  const [cameraPermission] = useCameraPermissions();
  const [mediaPermission] = MediaLibrary.usePermissions();

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({ quality: 0.5 });
        setPhoto(data);
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  const handleConfirm = () => {
    if (photo) {
      onPictureTaken(photo.uri);
      setPhoto(null);
      onClose();
    }
  };
  
  const handleRetake = () => {
      setPhoto(null);
  };

  useEffect(() => {
    if (!visible) {
      setPhoto(null);
    }
  }, [visible]);

  if (!visible) {
      return null;
  }

  if (!cameraPermission || !mediaPermission) {
    return <Modal visible={visible} transparent={true}><View style={styles.loadingContainer}><ActivityIndicator size="large" color="white" /></View></Modal>;
  }

  if (!cameraPermission.granted || !mediaPermission.granted) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.loadingContainer}>
            <Text style={styles.permissionText}>
              Camera and Media Library permissions are required. Please enable them in your device settings.
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={() => Linking.openSettings()}>
              <Text style={styles.permissionButtonText}>Open Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.permissionButton, {backgroundColor: '#555'}]} onPress={onClose}>
              <Text style={styles.permissionButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {photo ? (
          <>
            <Image source={{ uri: photo.uri }} style={styles.preview} />
            <View style={styles.previewControls}>
              <TouchableOpacity style={styles.button} onPress={handleRetake}>
                <Icon.RefreshCw stroke="white" width={32} height={32} />
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Icon.Check stroke="white" width={32} height={32} />
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <CameraView ref={cameraRef} style={styles.camera} facing="back">
            <GridOverlay />
             <TouchableOpacity style={{position: 'absolute', top: 50, left: 20}} onPress={onClose}>
                <Icon.X stroke="white" width={32} height={32}/>
            </TouchableOpacity>
            <View style={styles.shutterButtonContainer}>
              <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
                <Icon.Camera stroke="white" width={40} height={40} />
              </TouchableOpacity>
            </View>
          </CameraView>
        )}
      </View>
    </Modal>
  );
};

export default CameraModal;

