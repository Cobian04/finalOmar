import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Card } from "./Card";
import { colors, radius } from "../theme";

const priorityStyle = {
  Alta: { bg: colors.redSoft, color: colors.red, icon: "alert-circle" },
  Media: { bg: colors.amberSoft, color: colors.amber, icon: "information-circle" },
  Baja: { bg: colors.mintSoft, color: colors.mint, icon: "checkmark-circle" }
};

export function NoticeCard({ notice }) {
  const tone = priorityStyle[notice.priority] || priorityStyle.Media;
  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <View style={[styles.iconWrap, { backgroundColor: tone.bg }]}>
          <Ionicons name={tone.icon} color={tone.color} size={22} />
        </View>
        <View style={styles.meta}>
          <Text style={styles.type}>{notice.type}</Text>
          <Text style={styles.date}>{notice.date || notice.createdAtLabel || "Reciente"}</Text>
        </View>
      </View>
      <Text style={styles.title}>{notice.title}</Text>
      <Text style={styles.message}>{notice.message}</Text>
      <View style={styles.footer}>
        <Ionicons name="location-outline" size={15} color={colors.muted} />
        <Text style={styles.area}>{notice.area || "La Huerta"}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  meta: {
    flex: 1
  },
  type: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 14
  },
  date: {
    color: colors.muted,
    fontWeight: "600",
    marginTop: 2,
    fontSize: 12
  },
  title: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "850",
    marginBottom: 8
  },
  message: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500"
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 14
  },
  area: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  }
});
