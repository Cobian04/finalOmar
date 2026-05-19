# Cumplimiento de requisitos

## Funcionalidad obligatoria

- Navegacion entre pantallas:
  `App.js` usa `React Navigation` con `Stack Navigator` para autenticacion y `Bottom Tab Navigator` para Inicio, Reportar, Mapa, Directorio y Perfil.
- Pantalla principal con listado de avisos/reportes:
  `src/screens/HomeScreen.js` muestra avisos oficiales filtrables y `ReportCard` para reportes recientes.
- Mapa interactivo con marcadores:
  `src/screens/MapScreen.js` usa `react-native-maps` con marcadores de puntos de interes y reportes.
- Formularios validados:
  `src/screens/AuthScreen.js` valida correo y contrasena.
  `src/screens/ReportScreen.js` valida descripcion, referencia y GPS.
- Firebase Authentication y Firestore:
  `src/services/firebase.js` integra `signInAnonymously`, correo/contrasena, lectura de `notices` y escritura de `reports`.
- Camara para fotografias:
  `src/screens/ReportScreen.js` usa `expo-camera`.
- GPS para geolocalizacion:
  `src/screens/ReportScreen.js` y `src/screens/MapScreen.js` usan `expo-location`.
- Componentes reutilizables:
  `Screen`, `Header`, `Card`, `PrimaryButton`, `FormInput`, `NoticeCard` y `ReportCard`.
- Diseno responsivo y UX adecuada:
  `src/components/Screen.js` adapta el ancho en tablet/movil, mantiene espaciado consistente y mejora el manejo del teclado.

## Tecnologias obligatorias

- React Native: `react-native`
- Expo: `expo`
- Firebase: `firebase`
- Firestore: `firebase/firestore`
- React Navigation: `@react-navigation/*`
- Git y GitHub:
  El repositorio local ya es Git y tiene remoto GitHub configurado en `origin`.

## Entregables

- Repositorio GitHub con historial de commits:
  remoto `origin` configurado a `https://github.com/Cobian04/finalOmar.git`
- APK funcional o proyecto ejecutable en Expo Go:
  el proyecto ya corre en Expo Go; `eas.json` incluye perfil `preview` para APK Android.
- Presentacion del proyecto:
  `PRESENTACION_COMUNIAPP_SAPALH.md`
- Demo funcional de la aplicacion:
  validada en simulador iOS con Expo Go.

## Aspectos de evaluacion cubiertos

- Funcionalidad tecnica:
  autenticacion, Firestore, camara, GPS, mapa y navegacion.
- Calidad y organizacion del codigo:
  servicios, contexto, componentes y tema separados por responsabilidad.
- Diseno UX/UI:
  tarjetas, jerarquia visual clara, acciones primarias visibles y adaptacion responsiva.
- Originalidad:
  enfoque local para SAPALH La Huerta con educacion de ahorro de agua y seguimiento por estado.
- Integracion de competencias vistas en clase:
  React Native, Expo, Firebase, navegacion, validaciones, Git y documentacion.
- Presentacion del proyecto:
  guion editable y demostracion preparada.
