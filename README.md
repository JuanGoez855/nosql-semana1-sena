# Bases de Datos NoSQL — Unidad de Emprendimiento SENA

**Aprendiz:** Juan David Londoño Goez  
**Programa:** Tecnología en Análisis y Desarrollo de Software (ADSO) — SENA CTMA  
**Ficha:** 3223875  
**Instructor:** Wilson Castro Gil  
**Base de Datos:** `emprendimiento_sena_lab`  

---

## 📌 Descripción del Proyecto
Este repositorio contiene la evolución técnica integral del proyecto de **Bases de Datos NoSQL**, abarcando desde el diagnóstico inicial (Semana 1), pasando por el modelado documental v1 (Semana 2), hasta la implementación práctica de operaciones CRUD y consultas analíticas avanzadas (Semana 3).

El sistema administra emprendedores, iniciativas de negocio y el historial de asesorías técnicas de la Unidad de Emprendimiento del SENA, garantizando consistencia, trazabilidad de datos y reproducibilidad mediante semillas en formato Extended JSON (EJSON).

---

## 📂 Estructura del Repositorio

```text
diagnostico_nosql/
├── data/                               # Semilla de datos reproducible (E02)
│   ├── emprendedores.ejson.json        # 10 registros de emprendedores
│   ├── iniciativas.ejson.json          # 15 registros de iniciativas con perfil embebido
│   └── asesorias.ejson.json            # 30 registros de asesorías (15 realizadas, 10 programadas, 5 canceladas)
├── docs/                               # Documentación técnica y de diseño
│   ├── consultas_reglas_A3.md          # (Semana 1) Reglas de negocio y consultas iniciales
│   ├── matriz_seleccion_A2.md          # (Semana 1) Comparativa SQL vs NoSQL
│   ├── modelo_v1.md                    # (Semana 2) Diagrama ER Mermaid y cardinalidades v1
│   ├── patrones_acceso.md              # (Semana 2) Matriz de consultas Q01-Q06 y escrituras W01-W04
│   ├── diccionario.md                  # (Semana 2) Contrato de datos BSON y tipos por colección
│   ├── decisiones.md                   # (Semana 2) Registro de decisiones de arquitectura (ADR)
│   └── integridad.md                   # (Semana 2) Políticas de borrado lógico e integridad referencial
├── evidencias/                         # Registro fotográfico y técnico
│   ├── entorno.md                      # Registro técnico de instalación
│   ├── image.png                       # Evidencia inicial mongosh
│   ├── 01_carga_inicial.png            # Confirmación de ejecución de scripts/02_cargar_semilla.js
│   ├── 02_verificacion.png             # Confirmación de ejecución de scripts/03_verificar.js
│   ├── 03_error_referencia.png         # Captura de detección de referencia rota (EMP-999)
│   ├── 04_crud_tmp101.png              # Evidencia de práctica CRUD sobre documento temporal TMP-101
│   └── 05_consultas_diagnostico.png    # Evidencia de ejecución del script de consultas C01-C10
├── scripts/                            # Scripts de automatización en MongoDB Shell (mongosh)
│   ├── 01_explorar.js                  # (Semana 1) Inserción y exploración inicial
│   ├── 02_cargar_semilla.js            # (Semana 2) Carga idempotente con replaceOne/upsert
│   ├── 03_verificar.js                 # (Semana 2) Chequeo de conteos e integridad de referencias
│   └── 03_consultas_aprendiz.js        # (Semana 3) Ejecución de las 10 consultas diagnósticas (C01-C10)
├── P1.py                               # (Semana 1) Corrección y lectura de JSON
├── P2.py                               # (Semana 1) Filtrado y manejo de nulos en Python
├── P3.py                               # (Semana 1) Consulta JOIN en SQLite
├── .gitignore                          # Exclusión de archivos temporales
├── README.md                           # Documentación principal del repositorio
└── teoria.md                           # Cuestionario de diagnóstico teórico

##  Guía de Ejecución y Pruebas

1. **Clonar el repositorio y autenticarse en MongoDB:**
   ```bash
   mongosh "mongodb://localhost:27017/emprendimiento_sena_lab" --username aprendiz_nosql --authenticationDatabase emprendimiento_sena_lab

## Cargar y verificar la semilla inicial:
load('scripts/02_cargar_semilla.js');
load('scripts/03_verificar.js');

## Ejecutar las consultas diagnósticas de la semana 3 (C01 - C10):
load('scripts/03_consultas_aprendiz.js');