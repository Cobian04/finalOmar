import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radius } from "../theme";

export function FormInput({ label, error, style, ...props }) {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.faint}
        style={[styles.input, props.multiline && styles.multiline, error && styles.inputError]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8
  },
  input: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 16,
    fontWeight: "600"
  },
  multiline: {
    minHeight: 118,
    paddingTop: 14,
    textAlignVertical: "top"
  },
  inputError: {
    borderColor: colors.red
  },
  error: {
    color: colors.red,
    fontWeight: "700",
    marginTop: 6,
    fontSize: 12
  }
});
