import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { NoticeCard } from "../components/NoticeCard";
import { ReportCard } from "../components/ReportCard";
import { Screen } from "../components/Screen";
import { demoReports, notices, waterTips } from "../data/mockData";
import { subscribeOrderedCollection } from "../services/firebase";
import { colors, radius } from "../theme";

export function HomeScreen() {
  const [remoteNotices, setRemoteNotices] = useState(notices);
  const [reports, setReports] = useState(demoReports);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => subscribeOrderedCollection("notices", notices, setRemoteNotices), []);
  useEffect(() => subscribeOrderedCollection("reports", demoReports, setReports), []);

  const filtered = useMemo(() => {
    if (filter === "Todos") return remoteNotices;
    return remoteNotices.filter((notice) => notice.type === filter || notice.priority === filter);
  }, [filter, remoteNotices]);
  const recentReports = reports.slice(0, 3);

  const highPriority = remoteNotices.filter((notice) => notice.priority === "Alta").length;

  return (
    <Screen>
      <Header
        eyebrow="SAPALH LA HUERTA"
        title="Avisos del agua"
        subtitle="Consulta comunicados, cortes y reportes ciudadanos del municipio."
        right={
          <View style={styles.badge}>
            <Ionicons name="shield-checkmark" color={colors.mint} size={21} />
          </View>
        }
      />

      <View style={styles.metrics}>
        <Metric icon="alert-circle" value={highPriority} label="Urgentes" tone="red" />
        <Metric icon="document-text" value={reports.length} label="Reportes" tone="blue" />
        <Metric icon="checkmark-done" value="24h" label="Respuesta" tone="mint" />
      </View>

      <Card style={styles.tipCard}>
        <View style={styles.tipIcon}>
          <Ionicons name="sparkles" color={colors.amber} size={20} />
        </View>
        <View style={styles.tipCopy}>
          <Text style={styles.tipTitle}>Funcion extra agregada</Text>
          <Text style={styles.tipText}>
            La app integra avisos oficiales, reportes ciudadanos y seguimiento del servicio en un
            mismo flujo para fortalecer la comunicacion con SAPALH.
          </Text>
        </View>
      </Card>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Avisos oficiales</Text>
        <Text style={styles.sectionMeta}>{filtered.length} visibles</Text>
      </View>

      <View style={styles.filters}>
        {["Todos", "Alta", "Mantenimiento", "Comunicado"].map((item) => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[styles.filter, filter === item && styles.filterActive]}
          >
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {filtered.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reportes recientes</Text>
        <Text style={styles.sectionMeta}>{recentReports.length} activos</Text>
      </View>
      {recentReports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}

      <Text style={styles.sectionTitle}>Buenas practicas</Text>
      {waterTips.map((tip) => (
        <View key={tip} style={styles.tipRow}>
          <Ionicons name="water-outline" color={colors.blue} size={20} />
          <Text style={styles.tipRowText}>{tip}</Text>
        </View>
      ))}
    </Screen>
  );
}

function Metric({ icon, value, label, tone }) {
  const toneColor = {
    red: colors.red,
    blue: colors.blue,
    mint: colors.mint
  }[tone];

  return (
    <Card style={styles.metric}>
      <Ionicons name={icon} color={toneColor} size={22} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14
  },
  metric: {
    flexGrow: 1,
    flexBasis: 100,
    padding: 12,
    minHeight: 106,
    justifyContent: "space-between"
  },
  metricValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 8
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  tipCard: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#FFFDF7"
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.amberSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  tipCopy: {
    flex: 1
  },
  tipTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 4
  },
  tipText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600"
  },
  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap"
  },
  filter: {
    minHeight: 36,
    paddingHorizontal: 13,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border
  },
  filterActive: {
    backgroundColor: colors.dark,
    borderColor: colors.dark
  },
  filterText: {
    color: colors.muted,
    fontWeight: "800",
    fontSize: 13
  },
  filterTextActive: {
    color: "#FFFFFF"
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
    marginBottom: 10
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10
  },
  sectionMeta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 10
  },
  tipRowText: {
    flex: 1,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600"
  }
});
