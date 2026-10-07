# Actividad A3: Reglas de Negocio y Formulación de Consultas (Q01–Q06)
**Curso:** Bases de Datos NoSQL — ADSO SENA CTMA[cite: 1]  
**Caso:** Unidad de Emprendimiento del SENA[cite: 1]  

---

## 1. Matriz de Consultas Previstas (Q01–Q06)

| ID | Necesidad de Información | Actor Principal | Filtros y Criterios | Campos de Salida | Ordenamiento | Frecuencia Estimada (Hipótesis) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Q01** | Consultar iniciativas activas por sector y etapa didáctica[cite: 1]. | Coordinador de Emprendimiento | `estado = 'activa'`, `sector`, `etapa`[cite: 1] | `codigo`, `nombre`, `emprendedor_alias`, `sector`, `etapa`, `fecha_registro` | `fecha_registro DESC` | **Semanal** (revisión de avance por área) |
| **Q02** | Ver el detalle completo de una iniciativa con su propuesta de valor y atributos específicos[cite: 1]. | Asesor Técnico / Líder de Proyecto | `codigo_iniciativa`[cite: 1] | Objeto completo: datos generales, propuesta de valor, emprendedor responsable y atributos sectoriales (software/alimentos)[cite: 1] | N/A (consulta de documento único) | **Diaria** (al preparar una asesoría) |
| **Q03** | Consultar iniciativas pertenecientes a un emprendedor responsable según su estado[cite: 1]. | Emprendedor / Asesor | `emprendedor_id`, `estado` (`activa`/`archivada`)[cite: 1] | `codigo`, `nombre`, `sector`, `etapa`, `estado` | `nombre ASC` | **Semanal** (control de portafolio personal) |
| **Q04** | Consultar asesorías programadas pendientes por rango de fechas y modalidad[cite: 1]. | Coordinador / Asesor | `estado = 'programada'`, `fecha_programada` (rango inicio-fin), `modalidad`[cite: 1] | `codigo_asesoria`, `iniciativa.nombre`, `asesor_codigo`, `fecha_programada`, `modalidad`, `temas` | `fecha_programada ASC` | **Diaria** (agenda operativa) |
| **Q05** | Obtener el historial completo de asesorías recibidas por una iniciativa[cite: 1]. | Asesor / Emprendedor | `iniciativa.codigo`[cite: 1] | `codigo_asesoria`, `fecha_programada`, `fecha_realizacion`, `estado`, `temas`, `asesor_codigo`, `requiere_seguimiento` | `fecha_programada DESC` | **Ocasional** (al evaluar trazabilidad) |
| **Q06** | Contar la cantidad de asesorías realizadas por sector de iniciativa y mes[cite: 1]. | Directivo / Coordinador | `estado = 'realizada'`, `anio_mes`[cite: 1] | `sector_historico`, `mes_anio`, `total_asesorias` | `total_asesorias DESC` | **Mensual** (reportes de gestión) |

---

## 2. Aclaración Técnica para Q06 (Criterio de Sector)
* **Decisión de modelado:** En la consulta **Q06**, el `sector` corresponde al **sector histórico de la iniciativa al momento de realizar la asesoría** ( snapshot / valor registrado en el documento de asesoría )[cite: 1].
* **Justificación:** Si una iniciativa cambia formalmente de sector en el futuro (ej. de *alimentos* a *tecnologia* por reestructuración de modelo), las asesorías pasadas deben seguir contabilizándose en el sector en el que fueron atendidas originalmente para garantizar la integridad analítica de los reportes históricos[cite: 1].

---

## 3. Reglas de Negocio del Caso (Convenios Didácticos)

1. **Identificadores Únicos:** Se deben generar códigos de negocio únicos y estables para emprendedores (`EMP-XXX`), iniciativas (`INI-XXX`) y asesorías (`ASE-XXX`)[cite: 1].
2. **Asociación de Emprendedores:** Toda iniciativa debe estar asociada a un emprendedor responsable existente. Una persona puede ser responsable de múltiples iniciativas[cite: 1].
3. **Atención de Asesorías:** Cada sesión de asesoría debe registrar el código ficticio del asesor asignado y vincularse a una iniciativa válida existente[cite: 1].
4. **Dominios de Sectores y Etapas:**
   * **Sectores de ejemplo:** `tecnologia`, `alimentos`, `economia_circular`[cite: 1].
   * **Etapas didácticas:** `idea`, `validacion`, `puesta_en_marcha`[cite: 1].
5. **Estados de Entidades:**
   * **Iniciativa:** `activa` | `archivada`[cite: 1].
   * **Asesoría:** `programada` | `realizada` | `cancelada`[cite: 1].
6. **Manejo de Fechas:** 
   * Se registra siempre la `fecha_programada`.
   * La `fecha_realizacion` se registra únicamente cuando la sesión es efectivamente atendida (pudiendo diferir de la fecha original)[cite: 1].
   * Jamás se debe sobrescribir ni alterar `fecha_programada` para ocultar reprogramaciones[cite: 1].
7. **Restricción de Franja Horaria:** No se permite programar dos asesorías para el mismo asesor dentro del mismo bloque o franja horaria en el laboratorio[cite: 1].
8. **Independencia Histórica al Archivar:** El marcado de una iniciativa como `archivada` **no elimina** sus asesorías ni su historial acumulado[cite: 1].

---

## 4. Preguntas para el Responsable de la Unidad y Riesgo Identificado

### Preguntas para el Liderazgo de la Unidad:
1. *¿Una iniciativa que cambia de etapa didáctica (ej. de `idea` a `validacion`) requiere conservar una bitácora con las fechas exactas de cada cambio, o solo importa la etapa actual?*
2. *¿Es necesario restringir que una iniciativaarchivada vuelva a programar nuevas asesorías sin antes ser reactivada?*

### Riesgo Identificado:
* **Inconsistencia por duplicación descontrolada de datos:** Si se embeben copias completas de la información del emprendedor o de la iniciativa dentro de cada documento de asesoría sin definir qué campos son inmutables (snapshot) y cuáles deben actualizarse, se corre el riesgo de generar información contradictoria en reportes operativos[cite: 1].