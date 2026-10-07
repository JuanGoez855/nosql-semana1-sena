db = db.getSiblingDB("emprendimiento_sena_lab");

// 1. Inserción idempotente de ASE-DEMO-001
if (db.asesorias_demo.countDocuments({_id: "ASE-DEMO-001"}) === 0) {
  db.asesorias_demo.insertOne({
    _id: "ASE-DEMO-001",
    emprendedor_alias: "Emprendedor ficticio 01",
    iniciativa: {
      codigo: "INI-DEMO-001",
      nombre: "EcoEmpaque",
      sector: "economia_circular"
    },
    temas: ["propuesta de valor", "validacion de clientes"],
    modalidad: "virtual",
    estado: "programada",
    requiere_seguimiento: true,
    fecha_programada: new Date("2026-10-08T13:00:00Z"),
    fecha_realizacion: null
  });
}

// 2. Comprobación y verificación de tipos
printjson(db.asesorias_demo.findOne({_id: "ASE-DEMO-001"}));
const asesoria = db.asesorias_demo.findOne({_id: "ASE-DEMO-001"});
print("¿Es fecha_programada un objeto Date?:", asesoria.fecha_programada instanceof Date);

// 3. Ejercicio de transferencia (ASE-DEMO-002)
if (db.asesorias_demo.countDocuments({_id: "ASE-DEMO-002"}) === 0) {
  db.asesorias_demo.insertOne({
    _id: "ASE-DEMO-002",
    emprendedor_alias: "Emprendedor ficticio 02",
    iniciativa: {
      codigo: "INI-DEMO-002",
      nombre: "Sabores Locales",
      sector: "alimentos"
    },
    temas: ["manipulacion de alimentos", "registro sanitario"],
    modalidad: "presencial",
    estado: "programada",
    requiere_seguimiento: false,
    fecha_programada: new Date("2026-10-09T14:00:00Z"),
    fecha_realizacion: null
  });
}

print("Conteo total en asesorias_demo:", db.asesorias_demo.countDocuments());