import React, { useState, useRef, useEffect } from 'react';
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

// Component for the side controls
const CameraControls = ({ flash, onFlashToggle, onZoomIn, onZoomOut }) => {
  return (
    <View style={styles.sideControlsContainer}>
      <TouchableOpacity style={styles.controlButton} onPress={onFlashToggle}>
        {flash === 'off' ? (
          <Icon.ZapOff stroke="white" width={28} height={28} />
        ) : flash === 'on' ? (
          <Icon.Zap stroke="white" width={28} height={28} />
        ) : (
          <Text style={styles.autoFlashText}>A</Text> 
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onZoomIn}>
        <Icon.ZoomIn stroke="white" width={28} height={28} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onZoomOut}>
        <Icon.ZoomOut stroke="white" width={28} height={28} />
      </TouchableOpacity>
    </View>
  );
};


const CameraModal = ({ visible, onClose, onPictureTaken }) => {
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  
  // New states for controls
  const [flash, setFlash] = useState('off'); // 'off', 'on', 'auto'
  const [zoom, setZoom] = useState(0); // 0 to 1

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

  // Reset states when modal is closed
  useEffect(() => {
    if (!visible) {
      setPhoto(null);
      setZoom(0);
      setFlash('off');
    }
  }, [visible]);

  // --- New Control Handlers ---
  const handleFlashToggle = () => {
    setFlash(current => {
      if (current === 'off') return 'on';
      if (current === 'on') return 'auto';
      return 'off'; // 'auto' -> 'off'
    });
  };

  const handleZoomIn = () => {
    setZoom(current => Math.min(current + 0.1, 1)); // Increment zoom, max 1
  };

  const handleZoomOut = () => {
    setZoom(current => Math.max(current - 0.1, 0)); // Decrement zoom, min 0
  };
  // --- End New Control Handlers ---


  if (!visible) {
      return null;
  }

  if (!cameraPermission || !mediaPermission) {
    return <Modal visible={visible} transparent={true}><View style={styles.loadingContainer}><ActivityIndicator size="large" color="white" /></View></Modal>;
  }

  if (!cameraPermission.granted || !mediaPermission.granted) {
    // ... (permission denied view remains the same)
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
          <CameraView 
            ref={cameraRef} 
            style={styles.camera} 
            facing="back"
            flash={flash} // Pass flash state
            zoom={zoom}   // Pass zoom state
          >
            <GridOverlay />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon.X stroke="white" width={32} height={32}/>
            </TouchableOpacity>
            
            <CameraControls 
              flash={flash}
              onFlashToggle={handleFlashToggle}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
            />

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