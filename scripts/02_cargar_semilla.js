const fs = require('fs');
const path = require('path');

// Seleccionar la base de datos del laboratorio
db = db.getSiblingDB("emprendimiento_sena_lab");

print("\n==================================================");
print("   INICIANDO CARGA DE SEMILLA DE DATOS (E02)");
print("==================================================");

// Lista de colecciones a procesar desde data/
const colecciones = ['emprendedores', 'iniciativas', 'asesorias'];

colecciones.forEach(col => {
  const filePath = path.join(process.cwd(), 'data', `${col}.ejson.json`);
  
  if (fs.existsSync(filePath)) {
    try {
      const rawData = fs.readFileSync(filePath, 'utf8');
      const docs = EJSON.parse(rawData);
      
      let operados = 0;
      docs.forEach(doc => {
        // Carga idempotente: reemplaza si existe, inserta si no existe
        db.getCollection(col).replaceOne({ _id: doc._id }, doc, { upsert: true });
        operados++;
      });
      
      print(`[EXITO] Coleccion '${col}': ${operados} documentos procesados/actualizados.`);
    } catch (err) {
      print(`[ERROR] Fallo al parsear o cargar '${col}.ejson.json': ${err.message}`);
    }
  } else {
    print(`[ALERTA] Archivo no encontrado: ${filePath}`);
  }
});

print("==================================================");
print("   CARGA COMPLETADA CON EXITO");
print("==================================================\n");
