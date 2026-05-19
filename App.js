import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthScreen } from "./src/screens/AuthScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { DirectoryScreen } from "./src/screens/DirectoryScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { AuthContext, useAuth } from "./src/context/AuthContext";
import { Card } from "./src/components/Card";
import { Header } from "./src/components/Header";
import { Screen } from "./src/components/Screen";
import { auth, firebaseReady, loginAnonymous, logout, onAuthChange } from "./src/services/firebase";
import { colors, radius, shadow } from "./src/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.blue,
    card: colors.surface,
    text: colors.text,
    border: colors.border
  }
};

function LazyNativeScreen({ loader, eyebrow, title, subtitle }) {
  try {
    const Component = loader();
    return <Component />;
  } catch (error) {
    return (
      <Screen>
        <Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <Card style={styles.nativeFallback}>
          <Text style={styles.nativeFallbackTitle}>No se pudo abrir esta seccion en este momento</Text>
          <Text style={styles.nativeFallbackText}>
            Reinicia Expo Go con cache limpia y vuelve a intentar. Si continua, revisa que el
            simulador de iOS este funcionando correctamente.
          </Text>
          {__DEV__ ? (
            <Text style={styles.nativeFallbackError}>
              {error?.message || "Error desconocido al cargar el modulo nativo."}
            </Text>
          ) : null}
        </Card>
      </Screen>
    );
  }
}

function ReportScreenEntry() {
  return (
    <LazyNativeScreen
      loader={() => require("./src/screens/ReportScreen").ReportScreen}
      eyebrow="REPORTE CIUDADANO"
      title="Reportar mal uso"
      subtitle="Estamos cargando la camara y el formulario de reporte."
    />
  );
}

function MapScreenEntry() {
  return (
    <LazyNativeScreen
      loader={() => require("./src/screens/MapScreen").MapScreen}
      eyebrow="MAPA INTERACTIVO"
      title="Puntos de interes"
      subtitle="Estamos cargando el mapa y los servicios de ubicacion."
    />
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        lazy: true,
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, focused, size }) => {
          const icons = {
            Inicio: focused ? "water" : "water-outline",
            Reportar: focused ? "camera" : "camera-outline",
            Mapa: focused ? "map" : "map-outline",
            Directorio: focused ? "business" : "business-outline",
            Perfil: focused ? "person-circle" : "person-circle-outline"
          };
          return <Ionicons name={icons[route.name]} color={color} size={size} />;
        }
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Reportar" component={ReportScreenEntry} />
      <Tab.Screen name="Mapa" component={MapScreenEntry} />
      <Tab.Screen name="Directorio" component={DirectoryScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.blue} size="large" />
        <Text style={styles.loadingText}>Preparando ComuniApp...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="App" component={Tabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseReady || !auth) {
      setLoading(false);
      return undefined;
    }
    return onAuthChange((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      firebaseReady,
      enterDemo: () =>
        setUser({
          uid: "demo-user",
          isAnonymous: true,
          email: "demo@comuniapp.local",
          displayName: "Vecino demo"
        }),
      signInAnonymous: async () => {
        if (!firebaseReady) {
          setUser({ uid: "demo-user", isAnonymous: true, email: null });
          return;
        }
        await loginAnonymous();
      },
      signOut: async () => {
        if (firebaseReady) {
          await logout();
        }
        setUser(null);
      }
    }),
    [user, loading]
  );

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={value}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <NavigationContainer theme={navigationTheme}>
          <RootNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background
  },
  loadingText: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 15,
    fontWeight: "600"
  },
  tabBar: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    height: 70,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopWidth: 0,
    borderRadius: radius.xl,
    backgroundColor: "rgba(255,255,255,0.96)",
    ...shadow.soft
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "700"
  },
  nativeFallback: {
    gap: 12
  },
  nativeFallbackTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900"
  },
  nativeFallbackText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600"
  },
  nativeFallbackError: {
    color: colors.red,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700"
  }
});
