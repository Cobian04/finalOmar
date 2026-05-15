# ComuniApp SAPAL La Huerta

Aplicacion movil hibrida en React Native + Expo para comunicados de SAPAL, reportes anonimos de mal uso del agua, mapa de puntos de interes y directorio de servicios locales.

## Funciones incluidas

- Navegacion inferior entre Inicio, Reportar, Mapa, Directorio y Perfil.
- Pantalla principal con avisos, cortes, mantenimiento y filtros.
- Reporte ciudadano anonimo con formulario validado.
- Camara integrada para adjuntar evidencia fotografica.
- GPS para capturar la ubicacion del reporte.
- Mapa interactivo con marcadores de SAPAL, infraestructura, pozos y reportes.
- Firebase Authentication con correo/contrasena o acceso anonimo.
- Firestore para leer `notices` y guardar `reports`.
- Componentes reutilizables: `Screen`, `Header`, `Card`, `PrimaryButton`, `FormInput`, `NoticeCard`.
- Modo demo si no hay credenciales Firebase, util para Expo Go y presentacion.

## Ejecutar en Expo Go

```bash
npm install
npm run start
```

Despues escanea el QR con Expo Go en Android o iOS.

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

## Funcion extra agregada

Agregue seguimiento por estado y consejos de cuidado del agua. Esto hace que la app no solo sirva para denunciar mal uso, sino tambien para educar a la comunidad y explicar el flujo de atencion de SAPAL durante la demo.
