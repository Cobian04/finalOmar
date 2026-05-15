import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius } from "../theme";

export function PrimaryButton({
  title,
  icon,
  onPress,
  loading,
  variant = "primary",
  disabled,
  style
}) {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        (pressed || disabled) && styles.pressed,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#FFFFFF" : colors.blue} />
      ) : (
        <>
          {icon ? (
            <Ionicons name={icon} size={19} color={isPrimary ? "#FFFFFF" : colors.blue} />
          ) : null}
          <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16
  },
  primary: {
    backgroundColor: colors.blue
  },
  secondary: {
    backgroundColor: colors.blueSoft
  },
  pressed: {
    opacity: 0.72
  },
  text: {
    fontSize: 16,
    fontWeight: "800"
  },
  primaryText: {
    color: "#FFFFFF"
  },
  secondaryText: {
    color: colors.blue
  }
});
