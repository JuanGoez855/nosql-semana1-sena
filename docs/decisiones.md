# Decisiones de Arquitectura de Datos (ADR)

## Decisión 1: Guardar Asesorías en una Colección Separada (`asesorias`)
- **Necesidad:** Prevenir el antipatrón de arreglos ilimitados (*Unbounded Arrays*) en la colección `iniciativas`.
- **Alternativas:** (1) Arreglo embebido `iniciativas.asesorias[]` vs. (2) Colección independiente `asesorias`.
- **Elección:** Alternativa 2 (Colección independiente).
- **Costo:** Requiere dos lecturas o uso de agregación (`$lookup`) para consultar la iniciativa con todo su historial.
- **Condición de Revisión:** Si el límite de negocio establece que una iniciativa jamás tendrá más de 5 asesorías en su historia.

## Decisión 2: Embeber el Perfil en `iniciativas`
- **Necesidad:** Optimizar la consulta frecuente Q02 (Detalle de la iniciativa).
- **Alternativas:** (1) Colección `perfiles` separada vs. (2) Subdocumento embebido `perfil`.
- **Elección:** Alternativa 2 (Subdocumento embebido).
- **Costo:** Incrementa ligeramente el tamaño de la iniciativa, pero se mantiene dentro del margen de seguridad (< 2 KB).
- **Condición de Revisión:** Si los atributos sectoriales superan los 10 KB o requieren auditoría independiente.

## Decisión 3: Captura de Snapshot Histórico (`iniciativa_snapshot`)
- **Necesidad:** Asegurar que las consultas de reportes pasados (Q06) conserven el sector que tenía la iniciativa en la fecha en que se ejecutó la sesión, incluso si hoy cambia de sector.
- **Alternativas:** (1) Referenciar siempre el sector actual vs. (2) Copiar un snapshot al realizar la asesoría.
- **Elección:** Alternativa 2 (Snapshot histórico).
- **Costo:** Redundancia controlada de datos.
- **Condición de Revisión:** Ninguna; es indispensable para la trazabilidad histórica del caso.