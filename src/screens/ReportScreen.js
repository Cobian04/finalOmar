import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

import { Card } from "../components/Card";
import { FormInput } from "../components/FormInput";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { createReport } from "../services/firebase";
import { colors, radius } from "../theme";

const categories = ["Fuga", "Mal uso", "Toma irregular", "Baja presion", "Otro"];

export function ReportScreen() {
  const [category, setCategory] = useState("Fuga");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  async function captureLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Activa la ubicacion para geolocalizar el reporte.");
      return;
    }
    const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLocation({
      latitude: current.coords.latitude,
      longitude: current.coords.longitude
    });
  }

  async function openCamera() {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert("Camara requerida", "Necesitamos permiso para tomar la fotografia.");
        return;
      }
    }
    setCameraOpen(true);
  }

  async function takePhoto() {
    if (!cameraRef.current) return;
    const picture = await cameraRef.current.takePictureAsync({ quality: 0.72 });
    setPhoto(picture);
    setCameraOpen(false);
  }

  function validate() {
    const next = {};
    if (!description.trim() || description.trim().length < 15) {
      next.description = "Describe la situacion con al menos 15 caracteres.";
    }
    if (!reference.trim() || reference.trim().length < 5) {
      next.reference = "Agrega una referencia de calle, colonia o punto cercano.";
    }
    if (!location) {
      next.location = "Toma tu ubicacion GPS antes de enviar.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!validate()) return;
    try {
      setSaving(true);
      await createReport({
        category,
        description: description.trim(),
        reference: reference.trim(),
        anonymous,
        photoUri: photo?.uri || null,
        latitude: location.latitude,
        longitude: location.longitude
      });
      Alert.alert("Reporte enviado", "SAPALH recibio el reporte con estado inicial: Recibido.");
      setCategory("Fuga");
      setDescription("");
      setReference("");
      setAnonymous(true);
      setLocation(null);
      setPhoto(null);
      setErrors({});
    } catch (err) {
      Alert.alert("No se pudo enviar", err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen>
      <Header
        eyebrow="REPORTE CIUDADANO"
        title="Reportar mal uso"
        subtitle="Envia evidencia anonima con foto y GPS para que SAPALH pueda revisar el caso."
      />

      <Card style={styles.card}>
        <Text style={styles.label}>Tipo de reporte</Text>
        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={[styles.category, category === item && styles.categoryActive]}
            >
              <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <FormInput
          label="Descripcion"
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="Ej. Una persona esta desperdiciando agua con manguera abierta..."
          error={errors.description}
          style={styles.field}
        />

        <FormInput
          label="Referencia"
          value={reference}
          onChangeText={setReference}
          placeholder="Calle, colonia, negocio cercano"
          error={errors.reference}
          style={styles.field}
        />

        <View style={styles.switchRow}>
          <View style={styles.switchCopy}>
            <Text style={styles.switchTitle}>Enviar de forma anonima</Text>
            <Text style={styles.switchText}>No se mostraran datos personales en el reporte.</Text>
          </View>
          <Switch
            value={anonymous}
            onValueChange={setAnonymous}
            trackColor={{ false: colors.border, true: colors.blueSoft }}
            thumbColor={anonymous ? colors.blue : "#FFFFFF"}
          />
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title={location ? "Ubicacion lista" : "Tomar GPS"}
            icon={location ? "location" : "navigate"}
            variant={location ? "secondary" : "primary"}
            onPress={captureLocation}
            style={styles.action}
          />
          <PrimaryButton
            title={photo ? "Foto lista" : "Tomar foto"}
            icon={photo ? "image" : "camera"}
            variant={photo ? "secondary" : "primary"}
            onPress={openCamera}
            style={styles.action}
          />
        </View>

        {errors.location ? <Text style={styles.error}>{errors.location}</Text> : null}

        {location ? (
          <View style={styles.locationPill}>
            <Ionicons name="checkmark-circle" color={colors.mint} size={18} />
            <Text style={styles.locationText}>
              {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
            </Text>
          </View>
        ) : null}

        {photo ? <Image source={{ uri: photo.uri }} style={styles.preview} /> : null}

        <PrimaryButton
          title="Enviar reporte"
          icon="paper-plane"
          onPress={submit}
          loading={saving}
          style={styles.submit}
        />
      </Card>

      <Modal visible={cameraOpen} animationType="slide" onRequestClose={() => setCameraOpen(false)}>
        <View style={styles.cameraScreen}>
          <CameraView ref={cameraRef} style={styles.camera} facing="back" />
          <View style={styles.cameraBar}>
            <Pressable onPress={() => setCameraOpen(false)} style={styles.cameraButton}>
              <Ionicons name="close" color="#FFFFFF" size={26} />
            </Pressable>
            <Pressable onPress={takePhoto} style={styles.shutter}>
              <View style={styles.shutterInner} />
            </Pressable>
            <View style={styles.cameraButton} />
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900"
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  category: {
    minHeight: 38,
    paddingHorizontal: 13,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  categoryActive: {
    backgroundColor: colors.dark,
    borderColor: colors.dark
  },
  categoryText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800"
  },
  categoryTextActive: {
    color: "#FFFFFF"
  },
  field: {
    marginTop: 0
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: 14,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md
  },
  switchCopy: {
    flex: 1
  },
  switchTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  },
  switchText: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    marginTop: 2
  },
  actions: {
    flexDirection: "row",
    gap: 10
  },
  action: {
    flex: 1
  },
  error: {
    color: colors.red,
    fontWeight: "800",
    fontSize: 12
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: colors.mintSoft,
    borderRadius: radius.md,
    padding: 12
  },
  locationText: {
    color: colors.text,
    fontWeight: "800"
  },
  preview: {
    width: "100%",
    height: 210,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt
  },
  submit: {
    marginTop: 2
  },
  cameraScreen: {
    flex: 1,
    backgroundColor: "#000000"
  },
  camera: {
    flex: 1
  },
  cameraBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 132,
    paddingBottom: 28,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.34)"
  },
  cameraButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)"
  },
  shutter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF"
  }
});
