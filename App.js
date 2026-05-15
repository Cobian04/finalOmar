import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthScreen } from "./src/screens/AuthScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ReportScreen } from "./src/screens/ReportScreen";
import { MapScreen } from "./src/screens/MapScreen";
import { DirectoryScreen } from "./src/screens/DirectoryScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { AuthContext } from "./src/context/AuthContext";
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

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
      <Tab.Screen name="Reportar" component={ReportScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
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
  }
});
