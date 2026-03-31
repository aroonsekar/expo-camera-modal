import React from "react";
import { View, Text } from "react-native";
import * as Icon from "react-native-feather";
import styles from "../CameraStyles";

const FlashIcon = ({ flash }) => {
  if (flash === "on") {
    return <Icon.Zap stroke="#FFD60A" fill="#FFD60A" width={20} height={20} />;
  }
  if (flash === "auto") {
    return (
      <View style={styles.flashAutoWrapper}>
        <Icon.Zap stroke="white" width={20} height={20} />
        <Text style={styles.autoFlashBadge}>A</Text>
      </View>
    );
  }
  return <Icon.ZapOff stroke="rgba(255,255,255,0.7)" width={20} height={20} />;
};

export default FlashIcon;
