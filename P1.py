import json

# Versión inicial con errores de sintaxis
texto_erroneo = '{"codigo":"INI-001", "activa":True, "intereses":["Validar mercado",]}'

# 1 y 2. Capturar el error inicial
try:
    datos = json.loads(texto_erroneo)
except Exception as e:
    print(f"Error inicial capturado correctamente:\n{e}\n")

# Corrección de sintaxis JSON:
# - True (Python) pasa a true (JSON)
# - Se elimina la coma final en el arreglo (trailing comma)
texto_corregido = '{"codigo":"INI-001", "activa":true, "intereses":["Validar mercado"]}'

# 3. Cargar JSON corregido y mostrar tipos
datos = json.loads(texto_corregido)
print("Datos cargados:", datos)
print(f"codigo: {datos['codigo']} (Tipo: {type(datos['codigo']).__name__})")
print(f"activa: {datos['activa']} (Tipo: {type(datos['activa']).__name__})")