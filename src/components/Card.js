import React from "react";
import { StyleSheet, View } from "react-native";

import { colors, radius, shadow } from "../theme";

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(229,231,235,0.85)",
    ...shadow.card
  }
});
