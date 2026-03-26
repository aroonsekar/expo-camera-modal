import React from "react";
import { View, TouchableOpacity } from "react-native";
import * as Icon from "react-native-feather";
import FlashIcon from "./FlashIcon";
import styles from "../CameraStyles";

const TopControls = ({
  flash,
  showGrid,
  onFlashToggle,
  onGridToggle,
  onZoomIn,
  onZoomOut,
  onClose,
  topInset,
}) => (
  <View style={[styles.topBar, { paddingTop: topInset + 8 }]}>
    {/* Close — pinned left */}
    <TouchableOpacity
      style={styles.topBarButton}
      onPress={onClose}
      activeOpacity={0.7}
    >
      <Icon.X stroke="white" width={22} height={22} />
    </TouchableOpacity>

    {/* Controls — pinned right */}
    <View style={styles.topBarRightGroup}>
      <TouchableOpacity
        style={styles.topBarButton}
        onPress={onFlashToggle}
        activeOpacity={0.7}
      >
        <FlashIcon flash={flash} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.topBarButton, showGrid && styles.topBarButtonActive]}
        onPress={onGridToggle}
        activeOpacity={0.7}
      >
        <Icon.Grid
          stroke={showGrid ? "#FFD60A" : "rgba(255,255,255,0.7)"}
          width={20}
          height={20}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.topBarButton}
        onPress={onZoomOut}
        activeOpacity={0.7}
      >
        <Icon.ZoomOut stroke="white" width={20} height={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.topBarButton}
        onPress={onZoomIn}
        activeOpacity={0.7}
      >
        <Icon.ZoomIn stroke="white" width={20} height={20} />
      </TouchableOpacity>
    </View>
  </View>
);

export default TopControls;
