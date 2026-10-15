// Seleccionar la base de datos del laboratorio
db = db.getSiblingDB("emprendimiento_sena_lab");

print("\n==================================================");
print("   VERIFICACIÓN DE INTEGRIDAD Y CONTEOS (E02)");
print("==================================================");

// 1. Conteos de los documentos del laboratorio
const cEmprendedores = db.emprendedores.countDocuments({ dataset: "S02_UE_V1" });
const cIniciativas = db.iniciativas.countDocuments({ dataset: "S02_UE_V1" });
const cAsesorias = db.asesorias.countDocuments({ dataset: "S02_UE_V1" });

print(`Emprendedores registrados : ${cEmprendedores} / 10 esperados`);
print(`Iniciativas registradas   : ${cIniciativas} / 15 esperadas`);
print(`Asesorías registradas     : ${cAsesorias} / 30 esperadas`);
print("--------------------------------------------------");

// 2. Comprobación de Referencias Rotas
let referenciasRotas = 0;

// Validar que responsable_id en iniciativas exista en la colección emprendedores
db.iniciativas.find({ dataset: "S02_UE_V1" }).forEach(ini => {
  const empExists = db.emprendedores.findOne({ _id: ini.responsable_id });
  if (!empExists) {
    print(`[ERROR REFERENCIA] Iniciativa ${ini._id} apunta a responsable_id inexistente: '${ini.responsable_id}'`);
    referenciasRotas++;
  }
});

// Validar que iniciativa_id en asesorias exista en la colección iniciativas
db.asesorias.find({ dataset: "S02_UE_V1" }).forEach(ase => {
  const iniExists = db.iniciativas.findOne({ _id: ase.iniciativa_id });
  if (!iniExists) {
    print(`[ERROR REFERENCIA] Asesoría ${ase._id} apunta a iniciativa_id inexistente: '${ase.iniciativa_id}'`);
    referenciasRotas++;
  }
});

print("--------------------------------------------------");
if (referenciasRotas === 0) {
  print("RESULTADO DE INTEGRIDAD: PERFECTO (0 referencias rotas detectadas).");
} else {
  print(`RESULTADO DE INTEGRIDAD: ALERTA (${referenciasRotas} referencias rotas detectadas).`);
}
print("==================================================\n");