# ComuniApp SAPALH La Huerta

Aplicacion movil en React Native + Expo para comunicados de SAPALH, reportes anonimos de mal uso del agua, mapa de puntos de interes y directorio de servicios locales en La Huerta, Jalisco.

## Funciones incluidas

- Navegacion inferior entre Inicio, Reportar, Mapa, Directorio y Perfil.
- Pantalla principal con avisos oficiales, filtros y reportes recientes.
- Reporte ciudadano anonimo con formulario validado.
- Camara integrada para adjuntar evidencia fotografica.
- GPS para capturar la ubicacion del reporte.
- Mapa interactivo con marcadores de SAPALH, infraestructura, pozos y reportes.
- Firebase Authentication con correo/contrasena o acceso anonimo.
- Firestore para leer `notices` y guardar `reports`.
- Componentes reutilizables: `Screen`, `Header`, `Card`, `PrimaryButton`, `FormInput`, `NoticeCard`, `ReportCard`.
- Modo demo si no hay credenciales Firebase, util para Expo Go y presentacion.

## Cumplimiento de requisitos

- React Native, Expo, Firebase, Firestore y React Navigation integrados en el proyecto.
- Navegacion entre pantallas con `Stack` y `Bottom Tabs`.
- Inicio con listado real de avisos y reportes.
- Formularios con validaciones en autenticacion y reporte.
- Uso de camara con `expo-camera`.
- Uso de GPS con `expo-location`.
- Componentes reutilizables y tema centralizado.
- Diseno responsivo mejorado para movil y tablet.
- Repositorio Git con remoto GitHub configurado.

## Ejecutar en Expo Go

```bash
npm install
npx expo start
```

En VSCode, la terminal del proyecto ya queda configurada con `EXPO_OFFLINE=1`, asi que `npx expo start` evita el prompt de Expo y abre mejor en Expo Go.

Si usas una terminal externa, puedes correr:

```bash
EXPO_OFFLINE=1 npx expo start --offline --clear
```

## Configurar Firebase

1. Crea un proyecto en Firebase.
2. Activa Authentication con Email/Password y Anonymous.
3. Activa Firestore Database.
4. Copia `.env.example` a `.env` y agrega tus credenciales.
5. Reinicia Expo con cache limpia:

```bash
npx expo start --clear
```

Colecciones esperadas:

- `notices`: comunicados oficiales con `title`, `message`, `type`, `priority`, `area`, `createdAt`.
- `reports`: reportes ciudadanos con `category`, `description`, `reference`, `anonymous`, `photoUri`, `latitude`, `longitude`, `status`, `createdAt`.

## Generar APK

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

El perfil `preview` en `eas.json` genera APK.

## Presentacion y demo

- Presentacion editable: [PRESENTACION_COMUNIAPP_SAPALH.md](PRESENTACION_COMUNIAPP_SAPALH.md)
- Matriz de cumplimiento: [CUMPLIMIENTO_REQUISITOS.md](CUMPLIMIENTO_REQUISITOS.md)
- Demo funcional validada en Expo Go sobre simulador iOS.
