# Patrones de Acceso — Semana 2 (Unidad de Emprendimiento SENA)

## Consultas de Lectura (Q01 – Q06)

| ID | Nombre | Actor | Filtros | Campos de Salida | Orden | Frecuencia Supuesta | Colecciones Implicadas |
|---|---|---|---|---|---|---|---|
| **Q01** | Iniciativas activas | Orientador | `sector`, `etapa`, `estado: "activa"` | `_id`, `nombre`, `etapa` | `nombre: 1`, `_id: 1` | Alta (Diaria) | `iniciativas` |
| **Q02** | Detalle de iniciativa | Emprendedor / Asesor | `_id` | `propuesta_valor`, `atributos`, `responsable_id` | N/A | Alta (Diaria) | `iniciativas` |
| **Q03** | Iniciativas de un responsable | Orientador / Emprendedor | `responsable_id`, `estado` | `_id`, `nombre`, `estado` | `_id: 1` | Media | `iniciativas` |
| **Q04** | Asesorías pendientes | Asesor | Rango de `fecha_programada`, `modalidad`, `estado: "programada"` | `_id`, `iniciativa_id`, `asesor_codigo`, `fecha_programada` | `fecha_programada: 1` | Alta (Diaria) | `asesorias` |
| **Q05** | Historial de iniciativa | Orientador | `iniciativa_id` | `_id`, `estado`, `fecha_programada`, `fecha_realizacion`, `temas` | `fecha_programada: -1` | Media | `asesorias` |
| **Q06** | Asesorías realizadas por sector | Coordinador | Mes de `fecha_realizacion` | Conteo por `iniciativa_snapshot.sector` | Por mes | Mensual | `asesorias` |

## Patrones de Escritura (W01 – W04)

- **W01 - Crear Iniciativa:** Comprueba la existencia previa de `responsable_id` en `emprendedores`.
- **W02 - Programar Asesoría:** Comprueba que la iniciativa esté activa en `iniciativas`, valida horario del asesor y crea el registro con `estado: "programada"` en `asesorias`.
- **W03 - Marcar Asesoría Realizada:** Actualiza `estado` a `"realizada"`, establece `fecha_realizacion` y congela el `iniciativa_snapshot` (`nombre`, `sector`, `capturado_en`) en una sola operación sobre `asesorias`.
- **W04 - Archivar Iniciativa:** Cambia `estado` a `"archivada"` en `iniciativas` y gestiona/cancela las sesiones pendientes en `asesorias` manteniendo intacto el historial.
```

---

#### 1.2 `docs/modelo_v1.md`
```markdown
# Modelo Documental v1 — MongoDB

## Diagrama de Entidades y Relaciones

```mermaid
erDiagram
    EMPRENDEDORES ||--o{ INICIATIVAS : "1:N (responsable_id)"
    INICIATIVAS ||--o{ ASESORIAS : "1:N (iniciativa_id)"
    INICIATIVAS ||--|| PERFIL : "Embedding 1:1 (subdocumento perfil)"
    ASESORIAS ||--o| INICIATIVA_SNAPSHOT : "Snapshot histórico (al realizar)"