iniciativas = [
    {"codigo": "INI-001", "sector": "tecnologia", "pendiente": True},
    {"codigo": "INI-002", "sector": "alimentos", "pendiente": True},
    {"codigo": "INI-003", "sector": "tecnologia", "pendiente": False},
    {"codigo": "INI-004", "sector": "tecnologia"}  # Campo 'pendiente' ausente
]

def seleccionar_pendientes(registros, sector):
    # Retorna códigos del sector indicado con pendiente exactamente True
    resultado = []
    for item in registros:
        # Manejo de campo ausente: se usa .get() indicando valor por defecto None
        if item.get("sector") == sector and item.get("pendiente") is True:
            resultado.append(item["codigo"])
    return resultado

# Prueba 1: Con resultados esperados ('INI-001')
print("Prueba 'tecnologia':", seleccionar_pendientes(iniciativas, "tecnologia"))

# Prueba 2: Sin resultados
print("Prueba 'salud':", seleccionar_pendientes(iniciativas, "salud"))