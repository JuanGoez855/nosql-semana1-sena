Parte A. Diagnóstico teórico: 10 preguntas.
1.	¿Qué representan una tabla, una fila y una clave primaria? Utiliza un ejemplo relacionado con las iniciativas de emprendimiento.
R// Tabla, Fila y Clave Primaria (Ejemplo Emprendimiento)
Tabla: Colección estructurada de datos (ej. Emprendimientos).
Fila (Tupla): Registro único dentro de la tabla (ej. la iniciativa "EcoLámparas").
Clave Primaria (PK): Identificador único para cada fila (ej. id_emprendimiento = 101), que garantiza que no haya registros duplicados.

2.	¿Para qué sirve una clave foránea? ¿Qué problema genera una iniciativa que referencia a un emprendedor inexistente?
R//   Clave Foránea (FK): Campo que conecta una tabla con la clave primaria de otra para mantener la integridad referencial.
  Problema: Crear una iniciativa vinculada a un id_emprendedor inexistente genera un error de integridad referencial (o crea datos huérfanos e inconsistentes), ya que el sistema no puede asociar la iniciativa a una entidad válida.

3.	Explica qué devuelve SELECT codigo FROM iniciativas WHERE sector = 'tecnologia';. ¿Modifica registros?
R//   Qué devuelve: La lista de valores de la columna codigo de todas las iniciativas donde la columna sector sea exactamente 'tecnologia'.
  ¿Modifica registros?: No. SELECT es una consulta de solo lectura; no altera ni actualiza la base de datos.

4.	Diferencia una lista y un diccionario en Python. ¿Qué estructura utilizarías para una iniciativa y para varias iniciativas?
R//   Diferencia: Una lista es una secuencia ordenada indexada por posición ([elem1, elem2]); un diccionario es una estructura de pares clave-valor ({"clave": "valor"}).
  Estructura para una iniciativa: Un diccionario (ej. {"nombre": "CIVIX", "sector": "Construcción"}).
  Estructura para varias iniciativas: Una lista de diccionarios (ej. [iniciativa_1, iniciativa_2]).

5.	¿Son equivalentes false y "false" en JSON? Explica el tipo de cada valor.
R// No son equivalentes.
•	false: Es de tipo booleano (representa un valor lógico falso).
•	"false": Es de tipo cadena de texto (string) (representa los caracteres f-a-l-s-o).

6.	Diferencia un campo ausente, un campo con null y un campo con una cadena vacía. Propón un ejemplo.
R// Diferencias:
•	Campo ausente: La clave no existe en la estructura; la información no fue registrada.
•	Campo con null: La clave existe, pero expresamente no tiene valor (ausencia intencional de dato).
•	Campo con "": La clave existe y tiene un valor de tipo texto, pero no contiene caracteres (longitud cero).

7.	¿Qué ventaja tiene una función que retorna datos frente a otra que únicamente los imprime?
R// Ventaja: Una función que retorna datos entrega un valor que puede ser almacenado en variables, reutilizado en otros procesos o evaluado condicionalmente. Una función que solo imprime muestra el dato en pantalla, pero no permite que el resto del programa opere con él.

8.	Si falla la lectura de un archivo JSON, ¿qué revisarías antes de cambiar el programa?
R// Verificaciones antes de modificar el código al fallar lectura JSON
1.	Sintaxis del JSON: Validar que el archivo esté bien formado (comas, comillas dobles en claves/valores, llaves de cierre).
2.	Ruta y permisos: Confirmar que la ruta del archivo sea correcta y que el programa tenga permisos de lectura.
3.	Codificación de caracteres: Verificar que esté guardado en la codificación esperada (habitualmente UTF-8).

9.	¿Qué información reconoces en 2026-10-06T13:00:00Z? ¿Qué ambigüedades evita frente a 06/10/26 8:00?
R//   Información reconocida: ISO 8601 — Fecha: 6 de octubre de 2026; Hora: 13:00:00 (1:00 PM); Zona horaria: Z (UTC / Tiempo Universal Coordinado).
  Ambigüedades que evita frente a 06/10/26 8:00:
•	Orden de la fecha: Elimina la duda de si 06/10 es 6 de octubre o 10 de junio.
•	Siglo/Año: Aclara que el año es 2026 y no 1926.
•	Zona horaria y hora exacta: Especifica el huso horario exacto (UTC) y si la hora es AM o PM.

10.	Se publicó por error una contraseña en Git. ¿Qué acciones propondrías? ¿Es suficiente borrarla del archivo actual?
1.	R// Rotar/Cambiar inmediatamente la contraseña en el servicio correspondiente (la credencial expuesta debe considerarse comprometida al instante).
2.	Eliminar la credencial del historial de Git mediante herramientas de limpieza de historial como git-filter-repo o BFG Repo-Cleaner.
3.	Forzar el push de la rama limpia (git push --force) a los repositorios remotos.
•	¿Es suficiente borrarla del archivo actual? No, porque Git conserva el historial de todos los commits anteriores y la contraseña seguiría siendo visible en las versiones pasadas.
