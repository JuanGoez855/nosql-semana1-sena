// ==========================================
// SCRIPT CORREGIDO: 03_consultas_aprendiz.js
// ==========================================
var I = db.iniciativas;
var A = db.asesorias;

print("=== C01: Iniciativas activas de software en etapa de idea ===");
printjson(I.find({estado: 'activa', sector: 'software', etapa: 'idea'}, {_id: 1, nombre: 1, etapa: 1, sector: 1}).sort({nombre: 1, _id: 1}).toArray());

print("=== C02: Iniciativas activas con atributos tipo web o saas ===");
printjson(I.find({estado: 'activa', $or: [{'perfil.atributos.tipo': 'web'}, {'perfil.atributos.plataforma': 'saas'}]}, {_id: 1, nombre: 1, perfil: 1}).sort({_id: 1}).toArray());

print("=== C03: Iniciativas activas de EMP-001 ===");
printjson(I.find({estado: 'activa', responsable_id: 'EMP-001'}, {_id: 1, nombre: 1, responsable_id: 1}).sort({_id: 1}).toArray());

print("=== C04: Asesorías programadas virtuales (Octubre 2026 UTC) ===");
printjson(A.find({estado: 'programada', modalidad: 'virtual', fecha_programada: {$gte: ISODate('2026-10-01T00:00:00Z'), $lt: ISODate('2026-11-01T00:00:00Z')}}, {_id: 1, iniciativa_id: 1, fecha_programada: 1, modalidad: 1}).sort({fecha_programada: 1, _id: 1}).toArray());

print("=== C05: Historial de INI-001 (todos los estados) ===");
printjson(A.find({iniciativa_id: 'INI-001'}, {_id: 1, estado: 1, fecha_programada: 1}).sort({fecha_programada: 1, _id: 1}).toArray());

print("=== C06: Asesorías realizadas con tema 'propuesta de valor' ===");
printjson(A.find({estado: 'realizada', temas: 'propuesta de valor'}, {_id: 1, temas: 1}).sort({_id: 1}).toArray());

print("=== C07: Contacto igual a null (incluye ausentes) vs Null explícito ===");
print("--- Variante A: Incluye null y ausentes ---");
printjson(I.find({_id: {$in: ['INI-001', 'INI-002', 'INI-003']}, contacto_alterno: null}, {_id: 1, contacto_alterno: 1}).sort({_id: 1}).toArray());
print("--- Variante B: Null explícito y existente ---");
printjson(I.find({_id: {$in: ['INI-001', 'INI-002', 'INI-003']}, contacto_alterno: {$eq: null, $exists: true}}, {_id: 1, contacto_alterno: 1}).sort({_id: 1}).toArray());

print("=== C08: Contacto ausente vs presente / no null ===");
print("--- Variante A: Ausente ($exists: false) ---");
printjson(I.find({_id: {$in: ['INI-001', 'INI-002', 'INI-003']}, contacto_alterno: {$exists: false}}, {_id: 1, contacto_alterno: 1}).sort({_id: 1}).toArray());
print("--- Variante B: Presente con valor no null ---");
printjson(I.find({_id: {$in: ['INI-001', 'INI-002', 'INI-003']}, contacto_alterno: {$ne: null}}, {_id: 1, contacto_alterno: 1}).sort({_id: 1}).toArray());

print("=== C09: Iniciativas activas del sector alimentos (Alternativa a diagnóstico ausente) ===");
printjson(I.find({estado: 'activa', sector: 'alimentos'}, {_id: 1, nombre: 1, sector: 1}).sort({_id: 1}).toArray());

print("=== C10: Iniciativas activas paginadas (Página 1 y Página 2) ===");
var orden = {sector: 1, _id: 1};
var alcance = {estado: 'activa'};
print("--- Página 1 (Limit 3) ---");
printjson(I.find(alcance, {_id: 1, nombre: 1, sector: 1}).sort(orden).limit(3).toArray());
print("--- Página 2 usando skip(3) ---");
printjson(I.find(alcance, {_id: 1, nombre: 1, sector: 1}).sort(orden).skip(3).limit(3).toArray());