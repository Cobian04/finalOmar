import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Card } from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { colors, radius } from "../theme";

export function ProfileScreen() {
  const { user, firebaseReady, signOut } = useAuth();

  return (
    <Screen>
      <Header
        eyebrow="MI SESION"
        title="Perfil ciudadano"
        subtitle="Controla tu sesion y revisa que integraciones estan activas."
      />

      <Card style={styles.profile}>
        <View style={styles.avatar}>
          <Ionicons name={user?.isAnonymous ? "eye-off" : "person"} color="#FFFFFF" size={30} />
        </View>
        <Text style={styles.name}>{user?.email || "Vecino anonimo"}</Text>
        <Text style={styles.userId}>ID: {user?.uid}</Text>
      </Card>

      <Card style={styles.statusCard}>
        <StatusRow
          icon="key"
          label="Firebase Authentication"
          value={firebaseReady ? "Activo" : "Modo demo"}
          ok={firebaseReady}
        />
        <StatusRow
          icon="albums"
          label="Firestore"
          value={firebaseReady ? "Listo para guardar" : "Datos locales"}
          ok={firebaseReady}
        />
        <StatusRow icon="camera" label="Camara" value="Disponible en reporte" ok />
        <StatusRow icon="navigate" label="GPS" value="Disponible en reporte y mapa" ok />
      </Card>

      <Card style={styles.idea}>
        <Text style={styles.ideaTitle}>Funcion agregada recomendada</Text>
        <Text style={styles.ideaText}>
          Ademas del reporte anonimo, agregue seguimiento por estado: Recibido, En revision y
          Atendido. Esto ayuda a mostrar trazabilidad durante la demo y conecta mejor con la
          operacion real de SAPAL.
        </Text>
      </Card>

      <PrimaryButton title="Cerrar sesion" icon="log-out" variant="secondary" onPress={signOut} />
    </Screen>
  );
}

function StatusRow({ icon, label, value, ok }) {
  return (
    <View style={styles.statusRow}>
      <View style={[styles.statusIcon, { backgroundColor: ok ? colors.mintSoft : colors.amberSoft }]}>
        <Ionicons name={icon} color={ok ? colors.mint : colors.amber} size={19} />
      </View>
      <View style={styles.statusCopy}>
        <Text style={styles.statusLabel}>{label}</Text>
        <Text style={styles.statusValue}>{value}</Text>
      </View>
      <Ionicons name={ok ? "checkmark-circle" : "alert-circle"} color={ok ? colors.mint : colors.amber} size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    alignItems: "center",
    marginBottom: 14
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  userId: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 6
  },
  statusCard: {
    marginBottom: 14,
    gap: 14
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  statusIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center"
  },
  statusCopy: {
    flex: 1
  },
  statusLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  },
  statusValue: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "650",
    marginTop: 2
  },
  idea: {
    marginBottom: 14,
    backgroundColor: "#F9FBFF"
  },
  ideaTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6
  },
  ideaText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600"
  }
});
