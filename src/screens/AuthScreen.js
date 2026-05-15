import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Card } from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { FormInput } from "../components/FormInput";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors, radius } from "../theme";
import { loginWithEmail, registerWithEmail } from "../services/firebase";

export function AuthScreen() {
  const { enterDemo, firebaseReady, signInAnonymous } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isRegister = mode === "register";

  async function submitEmail() {
    setError("");
    if (!email.includes("@")) {
      setError("Escribe un correo valido.");
      return;
    }
    if (password.length < 6) {
      setError("La contrasena debe tener al menos 6 caracteres.");
      return;
    }

    if (!firebaseReady) {
      enterDemo();
      return;
    }

    try {
      setLoading(true);
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      Alert.alert("No se pudo iniciar sesion", err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Ionicons name="water" color="#FFFFFF" size={38} />
        </View>
        <Text style={styles.title}>ComuniApp SAPAL</Text>
        <Text style={styles.subtitle}>
          Comunicados, reportes anonimos y mapa del agua para La Huerta, Jalisco.
        </Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.segment}>
          <Pressable
            onPress={() => setMode("login")}
            style={[styles.segmentItem, mode === "login" && styles.segmentActive]}
          >
            <Text style={[styles.segmentText, mode === "login" && styles.segmentTextActive]}>
              Entrar
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode("register")}
            style={[styles.segmentItem, mode === "register" && styles.segmentActive]}
          >
            <Text style={[styles.segmentText, mode === "register" && styles.segmentTextActive]}>
              Crear cuenta
            </Text>
          </Pressable>
        </View>

        <FormInput
          label="Correo"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="vecino@lahuerta.mx"
          style={styles.field}
        />
        <FormInput
          label="Contrasena"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Minimo 6 caracteres"
          error={error}
          style={styles.field}
        />

        <PrimaryButton
          title={isRegister ? "Crear cuenta" : "Iniciar sesion"}
          icon={isRegister ? "person-add" : "log-in"}
          onPress={submitEmail}
          loading={loading}
        />
        <PrimaryButton
          title="Continuar anonimamente"
          icon="eye-off"
          variant="secondary"
          onPress={signInAnonymous}
          style={styles.secondary}
        />
        {!firebaseReady ? (
          <Text style={styles.demoNote}>
            Modo demo activo: agrega tus variables Firebase para usar Authentication y Firestore reales.
          </Text>
        ) : null}
      </Card>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 22
  },
  hero: {
    alignItems: "center",
    marginBottom: 24
  },
  logo: {
    width: 82,
    height: 82,
    borderRadius: 24,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    textAlign: "center"
  },
  subtitle: {
    color: colors.muted,
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    textAlign: "center"
  },
  card: {
    gap: 14
  },
  segment: {
    flexDirection: "row",
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: 4,
    marginBottom: 4
  },
  segmentItem: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11
  },
  segmentActive: {
    backgroundColor: "#FFFFFF"
  },
  segmentText: {
    color: colors.muted,
    fontWeight: "800"
  },
  segmentTextActive: {
    color: colors.text
  },
  field: {
    marginBottom: 2
  },
  secondary: {
    marginTop: 2
  },
  demoNote: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    textAlign: "center"
  }
});
