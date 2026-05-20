export const notices = [
  {
    id: "notice-1",
    title: "Baja presion en colonia Centro",
    message:
      "SAPALH La Huerta informa baja presion por mantenimiento preventivo en la red principal. El servicio se normalizara durante la tarde.",
    type: "Mantenimiento",
    priority: "Alta",
    date: "Hoy, 8:30 AM",
    area: "Centro"
  },
  {
    id: "notice-2",
    title: "Campana de cuidado del agua",
    message:
      "Evita lavar banquetas con manguera y reporta fugas visibles. Cada reporte ayuda a priorizar cuadrillas.",
    type: "Comunicado",
    priority: "Media",
    date: "Ayer, 6:00 PM",
    area: "Todo el municipio"
  },
  {
    id: "notice-3",
    title: "Corte programado en La Concepcion",
    message:
      "El jueves habra corte temporal de 9:00 a 13:00 por reparacion de valvula. Se recomienda almacenar solo lo necesario.",
    type: "Corte programado",
    priority: "Alta",
    date: "12 May",
    area: "La Concepcion"
  }
];

export const pointsOfInterest = [
  {
    id: "poi-1",
    title: "Oficina SAPALH La Huerta",
    description: "Pagos, aclaraciones, reportes y atencion ciudadana.",
    latitude: 19.4859,
    longitude: -104.6438,
    type: "Oficina",
    color: "#0A84FF"
  },
  {
    id: "poi-2",
    title: "Tanque de almacenamiento norte",
    description: "Infraestructura de distribucion de agua potable.",
    latitude: 19.4922,
    longitude: -104.6409,
    type: "Infraestructura",
    color: "#34C759"
  },
  {
    id: "poi-3",
    title: "Pozo municipal",
    description: "Punto de captacion y monitoreo operativo.",
    latitude: 19.4798,
    longitude: -104.6498,
    type: "Pozo",
    color: "#FF9F0A"
  },
  {
    id: "poi-4",
    title: "Zona con reporte reciente",
    description: "Fuga ciudadana pendiente de verificacion.",
    latitude: 19.4875,
    longitude: -104.6514,
    type: "Reporte",
    color: "#FF3B30"
  }
];

export const directory = [
  {
    id: "dir-1",
    name: "SAPALH La Huerta",
    role: "Atencion y administracion del agua potable",
    phone: "357 384 0000",
    schedule: "Lun a Vie, 9:00 - 15:00",
    address: "Presidencia Municipal, La Huerta, Jalisco"
  },
  {
    id: "dir-2",
    name: "Reportes de fugas",
    role: "Linea para fugas, desperdicio y tomas irregulares",
    phone: "357 384 0001",
    schedule: "Atencion extendida",
    address: "Servicio comunitario"
  },
  {
    id: "dir-3",
    name: "Proteccion Civil",
    role: "Apoyo ante contingencias por inundacion o falta critica de agua",
    phone: "911",
    schedule: "24 horas",
    address: "La Huerta, Jalisco"
  }
];

export const demoReports = [
  {
    id: "report-1",
    category: "Fuga",
    description: "Fuga visible sobre la banqueta, el agua corre hacia la calle.",
    status: "En revision",
    anonymous: true,
    createdAtLabel: "Hoy",
    reference: "Calle Hidalgo, zona Centro",
    latitude: 19.4875,
    longitude: -104.6514
  },
  {
    id: "report-2",
    category: "Mal uso",
    description: "Lavado de vehiculo con manguera abierta durante varios minutos.",
    status: "Recibido",
    anonymous: true,
    createdAtLabel: "Ayer",
    reference: "Colonia La Concepcion",
    latitude: 19.4832,
    longitude: -104.6419
  }
];

export const waterTips = [
  "Reporta fugas con foto y ubicacion para que SAPALH priorice la cuadrilla.",
  "Usa cubeta para lavar vehiculos y evita dejar la manguera abierta.",
  "Si detectas baja presion, revisa avisos antes de levantar un reporte duplicado."
];
