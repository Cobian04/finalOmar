# Presentacion: ComuniApp SAPAL La Huerta

## 1. Portada

ComuniApp SAPAL: comunicados y reportes ciudadanos para el cuidado del agua en La Huerta, Jalisco.

## 2. Problema

Los habitantes necesitan enterarse rapido de cortes, baja presion y mantenimientos. Tambien hace falta un canal sencillo y anonimo para reportar fugas o mal uso del agua.

## 3. Solucion

Una app movil en Expo que centraliza avisos oficiales, reportes anonimos con foto y GPS, mapa de puntos de interes y directorio de contacto de SAPAL.

## 4. Usuarios

Habitantes del municipio, personal de SAPAL y autoridades que necesitan visualizar incidencias para priorizar atencion.

## 5. Funcionalidades principales

- Inicio con comunicados y filtros.
- Reportes anonimos validados.
- Camara para evidencia.
- GPS para geolocalizacion.
- Mapa con marcadores.
- Directorio de servicios.
- Login con Firebase Authentication.
- Datos en Firestore.

## 6. Diseno UX/UI

El estilo se inspiro en iOS: fondos claros, tarjetas limpias, bordes suaves, iconografia simple, jerarquia visual grande y acciones principales en azul.

## 7. Arquitectura tecnica

React Native y Expo forman la app. React Navigation maneja las pantallas. Firebase Authentication controla la sesion. Firestore guarda avisos y reportes. Expo Camera y Expo Location integran evidencia y ubicacion.

## 8. Flujo de reporte

El usuario elige categoria, escribe descripcion, agrega referencia, mantiene anonimato si lo desea, toma GPS, captura foto y envia. El reporte queda con estado inicial `Recibido`.

## 9. Originalidad

La app esta enfocada en SAPAL y en el contexto local de La Huerta. Agrega educacion de cuidado del agua y seguimiento por estado para mejorar la confianza ciudadana.

## 10. Demo

1. Entrar en modo anonimo.
2. Revisar avisos del inicio.
3. Crear reporte con validaciones.
4. Tomar foto y ubicacion.
5. Ver marcadores en el mapa.
6. Mostrar perfil y estado de integraciones.

## 11. Cierre

ComuniApp SAPAL ayuda a comunicar, reportar y ubicar problemas del agua desde una experiencia movil clara, moderna y util para la comunidad.
