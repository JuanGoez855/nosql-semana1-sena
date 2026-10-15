# Integridad Referencial y Políticas de Eliminación

## Control de Integridad
MongoDB no aplica restricciones de clave foránea a nivel del motor. Por ello:
1. **Puntos de Validación:** La aplicación y los scripts de migración (`02_cargar_semilla.js` y `03_verificar.js`) verifican la existencia de `responsable_id` e `iniciativa_id` antes de persistir.
2. **Políticas de Borrado:**
   - **Emprendedores:** Se prohíbe el borrado físico (`remove`). Pasa a `estado: "inactivo"`.
   - **Iniciativas:** Se prohíbe el borrado físico. Pasa a `estado: "archivada"`. Sus asesorías asociadas se preservan intactas.
```

---

### 💻 PASO 2: Scripts de Carga y Verificación (`scripts/`)

Asegúrate de agregar los dos scripts en la carpeta `scripts/`[cite: 2]:

1. **`scripts/02_cargar_semilla.js`**: Lee los archivos JSON/EJSON de la carpeta `data/` y aplica `replaceOne` con `upsert: true` para cargar los 10 emprendedores, 15 iniciativas y 30 asesorías de forma idéntica e reproducible[cite: 2].
2. **`scripts/03_verificar.js`**: Realiza los conteos en la base de datos `emprendimiento_sena_lab` y valida que no existan referencias rotas (`responsable_id` o `iniciativa_id` que apunten a IDs inexistentes)[cite: 2].