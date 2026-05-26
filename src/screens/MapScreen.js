import React, { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "../components/Header";
import { Screen } from "../components/Screen";
import { demoReports, pointsOfInterest } from "../data/mockData";
import { subscribeOrderedCollection } from "../services/firebase";
import { colors, radius, shadow } from "../theme";

const laHuertaRegion = {
  latitude: 19.4859,
  longitude: -104.6438,
  latitudeDelta: 0.035,
  longitudeDelta: 0.035
};

export function MapScreen() {
  const [reports, setReports] = useState(demoReports);
  const [region, setRegion] = useState(laHuertaRegion);
  const [selected, setSelected] = useState(pointsOfInterest[0]);
  const [locating, setLocating] = useState(false);

  useEffect(() => subscribeOrderedCollection("reports", demoReports, setReports), []);

  const reportMarkers = useMemo(
    () =>
      reports
        .filter((report) => report.latitude && report.longitude)
        .map((report) => ({
          id: report.id,
          title: report.category,
          description: report.description,
          latitude: report.latitude,
          longitude: report.longitude,
          type: "Reporte",
          color: colors.red
        })),
    [reports]
  );

  const markers = [...pointsOfInterest, ...reportMarkers];

  async function locateMe() {
    try {
      setLocating(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso requerido", "Activa GPS para centrar el mapa en tu ubicacion.");
        return;
      }
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setRegion({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        latitudeDelta: 0.018,
        longitudeDelta: 0.018
      });
      setSelected({
        id: "current-location",
        title: "Tu ubicacion",
        description: "Ubicacion GPS capturada para referencia del reporte.",
        type: "GPS",
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        color: colors.blue
      });
    } catch {
      setRegion({ ...laHuertaRegion, latitudeDelta: 0.018, longitudeDelta: 0.018 });
      setSelected(pointsOfInterest[0]);
      Alert.alert(
        "Ubicacion de referencia",
        "El simulador no entrego GPS real. Centre el mapa en SAPALH La Huerta."
      );
    } finally {
      setLocating(false);
    }
  }

  return (
    <Screen scroll={false}>
      <View style={styles.content}>
        <Header
          eyebrow="MAPA INTERACTIVO"
          title="Puntos de interes"
          subtitle="Ubica oficinas, infraestructura y reportes recientes del servicio de agua."
        />
      </View>

      <View style={styles.mapWrap}>
        <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
              description={marker.description}
              pinColor={marker.color}
              onPress={() => setSelected(marker)}
            />
          ))}
        </MapView>

        <Pressable onPress={locateMe} disabled={locating} style={[styles.locate, locating && styles.locating]}>
          <Ionicons name={locating ? "hourglass" : "navigate"} color={colors.blue} size={24} />
        </Pressable>

        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetType}>{selected?.type || "Punto"}</Text>
          <Text style={styles.sheetTitle}>{selected?.title || "Selecciona un marcador"}</Text>
          <Text style={styles.sheetText}>
            {selected?.description || "Toca un punto del mapa para ver informacion."}
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 8
  },
  mapWrap: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.surfaceAlt
  },
  map: {
    flex: 1
  },
  locate: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card
  },
  locating: {
    opacity: 0.7
  },
  sheet: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 104,
    borderRadius: radius.xl,
    backgroundColor: "rgba(255,255,255,0.96)",
    padding: 18,
    ...shadow.soft
  },
  sheetHandle: {
    alignSelf: "center",
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginBottom: 12
  },
  sheetType: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 4
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900"
  },
  sheetText: {
    color: colors.muted,
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600"
  }
});
