import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme";

export function Header({ eyebrow, title, subtitle, right }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.copy}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 14
  },
  copy: {
    flex: 1
  },
  eyebrow: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 6
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: 0
  },
  subtitle: {
    color: colors.muted,
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500"
  }
});
