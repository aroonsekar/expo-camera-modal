import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Linking,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import styles from "./CameraStyles";

// Modular sub-components
import {
  GridOverlay,
  TopControls,
  BottomShutterBar,
  AspectRatioBadge,
} from "./components";

/**
 * CameraModal
 *
 * Props:
 *  visible         (bool)     – show/hide the modal
 *  onClose         (func)     – called when the user dismisses the camera
 *  onPictureTaken  (func)     – called with the photo URI on confirm
 *  quality         (number)   – JPEG compression 0‑1, default 0.7  (optional)
 *  initialFacing   (string)   – 'back' (default) or 'front'        (optional)
 *
 * Usage:
 *   // Most screens — back camera
 *   <CameraModal visible={show} onClose={close} onPictureTaken={handle} />
 *
 *   // Profile screen — front camera
 *   <CameraModal visible={show} onClose={close} onPictureTaken={handle} initialFacing="front" />
 */
const CameraModal = ({
  visible,
  onClose,
  onPictureTaken,
  quality = 0.7,
  initialFacing = "back",
}) => {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const [flash, setFlash] = useState("off");
  const [zoom, setZoom] = useState(0);
  const [showGrid, setShowGrid] = useState(true);

  const [cameraPermission] = useCameraPermissions();
  const [mediaPermission] = MediaLibrary.usePermissions();

  // ── Take picture ────────────────────────────────────
  const takePicture = useCallback(async () => {
    if (cameraRef.current && !isCapturing) {
      setIsCapturing(true);
      try {
        const data = await cameraRef.current.takePictureAsync({
          quality: Math.max(0, Math.min(1, quality)),
          exif: true,
        });
        setPhoto(data);
      } catch (error) {
        console.error("Failed to take picture:", error);
      } finally {
        setIsCapturing(false);
      }
    }
  }, [isCapturing, quality]);

  const handleConfirm = useCallback(() => {
    if (photo) {
      onPictureTaken(photo.uri);
      setPhoto(null);
      onClose();
    }
  }, [photo, onPictureTaken, onClose]);

  const handleRetake = () => setPhoto(null);

  // Reset all state when modal closes
  useEffect(() => {
    if (!visible) {
      setPhoto(null);
      setZoom(0);
      setFlash("off");
      setShowGrid(true);
      setIsCapturing(false);
    }
  }, [visible]);

  // ── Control handlers ────────────────────────────────
  const handleFlashToggle = () => {
    setFlash((c) => (c === "off" ? "on" : c === "on" ? "auto" : "off"));
  };
  const handleGridToggle = () => setShowGrid((c) => !c);
  const handleZoomIn = () => setZoom((c) => Math.min(c + 0.05, 1));
  const handleZoomOut = () => setZoom((c) => Math.max(c - 0.05, 0));

  if (!visible) return null;

  /* ── Loading permissions ── */
  if (!cameraPermission || !mediaPermission) {
    return (
      <Modal visible={visible} transparent>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
    );
  }

  /* ── Permissions denied ── */
  if (!cameraPermission.granted || !mediaPermission.granted) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View
          style={[
            styles.permissionContainer,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
          ]}
        >
          <View style={styles.permissionContent}>
            <View style={styles.permissionIconCircle}>
              <Icon.Camera stroke="white" width={40} height={40} />
            </View>
            <Text style={styles.permissionTitle}>Camera Access Required</Text>
            <Text style={styles.permissionText}>
              We need camera and media library permissions to capture photos.
              Please enable them in your device settings.
            </Text>
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={() => Linking.openSettings()}
              activeOpacity={0.8}
            >
              <Icon.Settings stroke="white" width={18} height={18} />
              <Text style={styles.permissionButtonText}>Open Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.permissionButtonSecondary}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.permissionButtonSecondaryText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  /* ── Camera / Preview ── */
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {photo ? (
          /* ────────────── Preview Mode ────────────── */
          <View style={[styles.previewWrapper, { paddingTop: insets.top }]}>
            <Image source={{ uri: photo.uri }} style={styles.preview} />

            <AspectRatioBadge width={photo.width} height={photo.height} />

            <View
              style={[
                styles.previewControls,
                { paddingBottom: insets.bottom + 16 },
              ]}
            >
              <TouchableOpacity
                style={styles.previewButton}
                onPress={handleRetake}
                activeOpacity={0.8}
              >
                <Icon.RefreshCw stroke="white" width={22} height={22} />
                <Text style={styles.previewButtonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.previewButton, styles.previewButtonConfirm]}
                onPress={handleConfirm}
                activeOpacity={0.8}
              >
                <Icon.Check stroke="white" width={22} height={22} />
                <Text style={styles.previewButtonText}>Use Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* ────────────── Camera Mode ────────────── */
          <View style={styles.cameraFullScreen}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={initialFacing}
              flash={flash}
              zoom={zoom}
            >
              {showGrid && <GridOverlay />}
            </CameraView>

            <TopControls
              flash={flash}
              showGrid={showGrid}
              onFlashToggle={handleFlashToggle}
              onGridToggle={handleGridToggle}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onClose={onClose}
              topInset={insets.top}
            />

            <BottomShutterBar
              zoom={zoom}
              isCapturing={isCapturing}
              onCapture={takePicture}
              bottomInset={insets.bottom}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CameraModal;
