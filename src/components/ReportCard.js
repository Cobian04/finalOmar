import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Card } from "./Card";
import { colors, radius } from "../theme";

const statusStyle = {
  Recibido: { bg: colors.blueSoft, color: colors.blue, icon: "time" },
  "En revision": { bg: colors.amberSoft, color: colors.amber, icon: "search" },
  Atendido: { bg: colors.mintSoft, color: colors.mint, icon: "checkmark-done" }
};

export function ReportCard({ report }) {
  const tone = statusStyle[report.status] || statusStyle.Recibido;
  const reference = report.reference || "Ubicacion registrada en el mapa";
  const createdAtLabel = report.createdAtLabel || "Reciente";

  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <View style={[styles.iconWrap, { backgroundColor: tone.bg }]}>
          <Ionicons name={tone.icon} color={tone.color} size={20} />
        </View>
        <View style={styles.meta}>
          <Text style={styles.category}>{report.category || "Reporte ciudadano"}</Text>
          <Text style={styles.date}>{createdAtLabel}</Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: tone.bg }]}>
          <Text style={[styles.statusText, { color: tone.color }]}>{report.status || "Recibido"}</Text>
        </View>
      </View>

      <Text style={styles.description}>{report.description}</Text>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color={colors.muted} />
        <Text style={styles.rowText}>{reference}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerPill}>
          <Ionicons
            name={report.anonymous ? "eye-off-outline" : "person-outline"}
            size={14}
            color={colors.muted}
          />
          <Text style={styles.footerText}>{report.anonymous ? "Anonimo" : "Identificado"}</Text>
        </View>
        {typeof report.latitude === "number" && typeof report.longitude === "number" ? (
          <View style={styles.footerPill}>
            <Ionicons name="navigate-outline" size={14} color={colors.muted} />
            <Text style={styles.footerText}>
              {report.latitude.toFixed(3)}, {report.longitude.toFixed(3)}
            </Text>
          </View>
        ) : null}
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
    marginBottom: 12
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  meta: {
    flex: 1
  },
  category: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 15
  },
  date: {
    color: colors.muted,
    marginTop: 2,
    fontWeight: "600",
    fontSize: 12
  },
  statusPill: {
    minHeight: 30,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center"
  },
  statusText: {
    fontWeight: "900",
    fontSize: 12
  },
  description: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12
  },
  rowText: {
    flex: 1,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14
  },
  footerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    minHeight: 30,
    borderRadius: 999
  },
  footerText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  }
});
