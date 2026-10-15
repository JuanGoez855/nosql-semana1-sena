# Modelo Documental v1 — MongoDB (Unidad de Emprendimiento SENA)

## 1. Visión General del Modelo
El modelo de datos v1 para la Unidad de Emprendimiento del SENA está diseñado en tres colecciones principales (`emprendedores`, `iniciativas` y `asesorias`) para soportar los patrones de acceso Q01–Q06 y las operaciones de escritura W01–W04.

---

## 2. Diagrama de Relaciones y Cardinalidades

```mermaid
erDiagram
    EMPRENDEDORES ||--o{ INICIATIVAS : "1:N (responsable_id)"
    INICIATIVAS ||--o{ ASESORIAS : "1:N (iniciativa_id)"
    INICIATIVAS ||--|| PERFIL : "Embedding 1:1 (subdocumento perfil)"
    ASESORIAS ||--o| INICIATIVA_SNAPSHOT : "Snapshot histórico (al realizar)"