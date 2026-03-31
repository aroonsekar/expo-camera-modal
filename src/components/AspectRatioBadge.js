import React from "react";
import { View, Text } from "react-native";
import styles from "../CameraStyles";

const AspectRatioBadge = ({ width, height }) => {
  if (!width || !height) return null;

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  const rW = width / divisor;
  const rH = height / divisor;

  let label = `${rW}:${rH}`;
  const ratio = width / height;
  if (Math.abs(ratio - 4 / 3) < 0.05) label = "4:3";
  else if (Math.abs(ratio - 16 / 9) < 0.05) label = "16:9";
  else if (Math.abs(ratio - 3 / 4) < 0.05) label = "3:4";
  else if (Math.abs(ratio - 9 / 16) < 0.05) label = "9:16";
  else if (Math.abs(ratio - 1) < 0.05) label = "1:1";

  return (
    <View style={styles.aspectBadge}>
      <Text style={styles.aspectBadgeText}>
        {width}×{height} ({label})
      </Text>
    </View>
  );
};

export default AspectRatioBadge;
