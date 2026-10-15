# Diccionario de Datos (Contrato BSON v1)

## Colección: `emprendedores`
| Ruta Campo | Tipo BSON | Presencia | Regla / Dominio | Significado |
|---|---|---|---|---|
| `_id` | String | Requerido | Formato `EMP-XXX` | ID único del emprendedor |
| `dataset` | String | Requerido | Valor `"S02_UE_V1"` | Identificador del laboratorio |
| `alias` | String | Requerido | 3 a 100 caracteres | Alias o nombre ficticio |
| `estado` | String | Requerido | `"activo"`, `"inactivo"` | Estado en la plataforma |

## Colección: `iniciativas`
| Ruta Campo | Tipo BSON | Presencia | Regla / Dominio | Significado |
|---|---|---|---|---|
| `_id` | String | Requerido | Formato `INI-XXX` | ID único de la iniciativa |
| `dataset` | String | Requerido | Valor `"S02_UE_V1"` | Identificador del conjunto |
| `responsable_id` | String | Requerido | Debe existir en `emprendedores` | Emprendedor a cargo |
| `nombre` | String | Requerido | 1 a 100 caracteres | Nombre comercial |
| `sector` | String | Requerido | `"alimentos"`, `"software"`, etc. | Sector actual |
| `etapa` | String | Requerido | `"idea"`, `"validacion"`, `"escalamiento"` | Fase actual |
| `estado` | String | Requerido | `"activa"`, `"archivada"` | Estado operativo |
| `perfil` | Object | Requerido | Subdocumento | Atributos y propuesta de valor |

## Colección: `asesorias`
| Ruta Campo | Tipo BSON | Presencia | Regla / Dominio | Significado |
|---|---|---|---|---|
| `_id` | String | Requerido | Formato `ASE-XXX` | ID único de la sesión |
| `dataset` | String | Requerido | Valor `"S02_UE_V1"` | Identificador del laboratorio |
| `iniciativa_id` | String | Requerido | Debe existir en `iniciativas` | ID de la iniciativa vinculada |
| `asesor_codigo` | String | Requerido | `"ASESOR-01"`, `"ASESOR-02"`, `"ASESOR-03"` | Asesor asignado |
| `estado` | String | Requerido | `"programada"`, `"realizada"`, `"cancelada"` | Estado de la cita |
| `modalidad` | String | Requerido | `"virtual"`, `"presencial"` | Tipo de atención |
| `fecha_programada` | Date | Requerido | ISODate | Fecha y hora agendada |
| `fecha_realizacion` | Date / Null | Condicional | Date si realizada; Null si no | Fecha efectiva de atención |
| `temas` | Array[String]| Requerido | 1 a 5 elementos | Temas tratados |
| `iniciativa_snapshot`| Object / Null| Condicional | Objeto si realizada; Null si no | Resumen histórico del negocio |