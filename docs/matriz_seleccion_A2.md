# Actividad A2: Matriz de Selección de Modelos NoSQL y Relacional
**Curso:** Bases de Datos NoSQL — ADSO SENA CTMA[cite: 1]  
**Caso:** Unidad de Emprendimiento del SENA[cite: 1]  

---

## 1. Matriz Comparativa de Modelos

| Caso de Uso | Modelo Propuesto | Razón Vinculada a una Consulta | Límite o Costo | Alternativa |
| :--- | :--- | :--- | :--- | :--- |
| **Iniciativas de varios sectores**[cite: 1] | **Documental** *(MongoDB)*[cite: 1] | Permite esquemas flexibles dentro de una misma colección[cite: 1]. Una iniciativa de software puede incluir campos de `repositorio` o `stack_tecnologico`, mientras que una de alimentos incluye `registro_invima` y `vida_util`[cite: 1], permitiendo consultar el documento completo en una sola operación sin uniones complejas[cite: 1]. | Repetición de nombres de campos en cada documento, lo que incrementa el consumo de almacenamiento en disco frente a esquemas fijos de SQL[cite: 1]. | Relacional con patrón EAV (*Entity-Attribute-Value*) o columnas JSONB[cite: 1]. |
| **Sesiones temporales**[cite: 1] | **Clave-Valor** *(Redis)*[cite: 1] | Permite lectura y escritura en memoria con latencias de submilisegundo mediante la clave de sesión (`session_id`)[cite: 1]. Soporta de forma nativa tiempos de expiración (*TTL* - Time To Live) para destruir la sesión automáticamente al vencer[cite: 1]. | Volatilidad de datos si no se configura la persistencia en disco, además de limitaciones en la capacidad de realizar consultas sobre el contenido del valor guardado[cite: 1]. | Tabla SQL de sesiones con tareas programadas (*cron jobs*) para depuración[cite: 1]. |
| **Recorridos de relaciones**[cite: 1] | **Grafos** *(Neo4j)*[cite: 1] | Facilita realizar consultas de vinculación profunda en tiempo real (ej. *"¿Qué emprendedores comparten el mismo mentor en la categoría de IA y coinciden en habilidades de prototipado?"*) cruzando nodos y relaciones directamente[cite: 1]. | Complejidad de gestión del motor, curva de aprendizaje del lenguaje de consulta (Cypher) y alto costo computacional para operaciones de agregación masiva[cite: 1]. | Múltiples tablas intermedias en SQL (*JOINs* recursivos / CTEs)[cite: 1]. |
| **Lecturas masivas por dispositivo / periodo**[cite: 1] | **Familias de Columnas** *(Cassandra)*[cite: 1] | Diseñado para altas tasas de escritura descendente y lecturas secuenciales rápidas ordenadas por tiempo en proyectos agroindustriales a gran escala con miles de sensores[cite: 1]. | Las consultas quedan rígidamente acotadas al diseño de las claves de partición y ordenamiento; no es adecuado para consultas ad-hoc o analíticas arbitrarias[cite: 1]. | Base de datos para series temporales (*TimescaleDB*)[cite: 1]. |

---

## 2. Justificación de un Escenario para Conservar un Modelo SQL (Relacional)

A pesar de las ventajas de flexibilidad que ofrece NoSQL para el registro heterogéneo de proyectos[cite: 1], se optaría por **conservar una base de datos relacional (SQL)** en el módulo de **Gestión Contable, Financiera y Asignación de Recursos Presupuestales** de la Unidad de Emprendimiento.

### Razones Técnicas:
1. **Garantía estricta de Transacciones ACID:** La asignación de fondos, desembolsos e historial de presupuestos requiere consistencia inmediata y aislamiento absoluto. No se pueden tolerar inconsistencias eventuales al debitar saldos de convocatorias y acreditarlos a las iniciativas.
2. **Integridad Referencial Estricta:** Un rubro de gasto no puede quedar huérfano ni desvincularse de una orden de pago válida. Las claves foráneas de SQL garantizan a nivel de motor que no existan registros sin correspondencia.
3. **Estructura Tabular Fija:** Los registros financieros siguen normas legales y formatos contables totalmente estandarizados que no varían entre sectores económicos, eliminando la necesidad de esquemas dinámicos o documentos flexibles[cite: 1].