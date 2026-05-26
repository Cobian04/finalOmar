import React from "react";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Screen } from "../components/Screen";
import { directory } from "../data/mockData";
import { colors, radius } from "../theme";

export function DirectoryScreen() {
  async function callService(phone) {
    const phoneNumber = phone.replaceAll(" ", "");
    const url = `tel:${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        return;
      }

      Alert.alert("Telefono", `Marca manualmente al ${phone}.`);
    } catch {
      Alert.alert("Telefono", `No se pudo abrir la llamada. Marca manualmente al ${phone}.`);
    }
  }

  return (
    <Screen>
      <Header
        eyebrow="DIRECTORIO"
        title="Servicios locales"
        subtitle="Contactos utiles relacionados con agua, reportes y emergencias en La Huerta."
      />

      {directory.map((item) => (
        <Card key={item.id} style={styles.card}>
          <View style={styles.top}>
            <View style={styles.icon}>
              <Ionicons name="business" color={colors.blue} size={22} />
            </View>
            <View style={styles.copy}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
          </View>

          <Info icon="time-outline" text={item.schedule} />
          <Info icon="location-outline" text={item.address} />

          <Pressable
            onPress={() => callService(item.phone)}
            style={styles.call}
          >
            <Ionicons name="call" color="#FFFFFF" size={18} />
            <Text style={styles.callText}>{item.phone}</Text>
          </Pressable>
        </Card>
      ))}

      <Card style={styles.protocol}>
        <Text style={styles.protocolTitle}>Como funciona un reporte</Text>
        <Step number="1" text="La persona envia descripcion, ubicacion y evidencia." />
        <Step number="2" text="SAPALH recibe el caso en Firestore con estado Recibido." />
        <Step number="3" text="El personal puede revisar, priorizar y actualizar el seguimiento." />
      </Card>
    </Screen>
  );
}

function Info({ icon, text }) {
  return (
    <View style={styles.info}>
      <Ionicons name={icon} color={colors.muted} size={17} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function Step({ number, text }) {
  return (
    <View style={styles.step}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14
  },
  top: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.blueSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  copy: {
    flex: 1
  },
  name: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "900"
  },
  role: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    marginTop: 3
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8
  },
  infoText: {
    flex: 1,
    color: colors.muted,
    fontSize: 14,
    fontWeight: "650"
  },
  call: {
    marginTop: 16,
    minHeight: 46,
    borderRadius: radius.md,
    backgroundColor: colors.blue,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  callText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900"
  },
  protocol: {
    marginTop: 4,
    gap: 12
  },
  protocolTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 2
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center"
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900"
  },
  stepText: {
    flex: 1,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600"
  }
});
