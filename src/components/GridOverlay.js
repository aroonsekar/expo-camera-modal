import React from "react";
import { View, StyleSheet } from "react-native";
import styles from "../CameraStyles";

const GridOverlay = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <View
      style={[styles.gridLine, styles.gridLineHorizontal, { top: "33.33%" }]}
    />
    <View
      style={[styles.gridLine, styles.gridLineHorizontal, { top: "66.66%" }]}
    />
    <View
      style={[styles.gridLine, styles.gridLineVertical, { left: "33.33%" }]}
    />
    <View
      style={[styles.gridLine, styles.gridLineVertical, { left: "66.66%" }]}
    />
  </View>
);

export default GridOverlay;
