import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../CameraStyles";

const BottomShutterBar = ({ zoom, isCapturing, onCapture, bottomInset }) => {
  const zoomDisplay = zoom > 0 ? `${(1 + zoom * 9).toFixed(1)}×` : "1×";

  return (
    <View style={[styles.bottomBar, { paddingBottom: bottomInset + 12 }]}>
      {/* Zoom pill */}
      <View style={styles.zoomPill}>
        <Text style={styles.zoomPillText}>{zoomDisplay}</Text>
      </View>

      {/* Shutter button */}
      <TouchableOpacity
        style={styles.shutterOuter}
        onPress={onCapture}
        activeOpacity={0.7}
        disabled={isCapturing}
      >
        <View
          style={[styles.shutterInner, isCapturing && styles.shutterCapturing]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomShutterBar;
