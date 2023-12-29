CREATE (n:Doctor {
  name: "Dr. Admin",
  username: "Dr. Admin",
  email: "dr.admin@hospital.com",
  age: 45,
  especialidad: "Cirugía general",
  password: "contraseña123"
});


CREATE (n:Doctor {
  name: "Dr. Pérez",
  username: "Dr. Pérez",
  email: "dr.perez@hospital.com",
  age: 45,
  especialidad: "Cirugía general",
  password: "contraseña123"
});



CREATE (doctor2:Doctor {
  name: "Dr. García",
  username: "Dr. García",
  email: "dr.garcia@hospital.com",
  age: 35,
  especialidad: "Pediatría",
  password: "contraseña456"
});



CREATE (n:Doctor {
  name: "María García Rodríguez",
  username: "maria.garcia",
  email: "maria.garcia@gmail.com",
  age: 30,
  especialidad: "Pediatría",
  password: "contraseña456"
})


CREATE (n:Doctor {
  name: "Juan Pérez López",
  username: "juan.perez",
  email: "juan.perez@gmail.com",
  age: 35,
  especialidad: "Medicina General",
  password : "contraseña456" 
})




MATCH (n:Doctor), (m:Doctor)
WHERE n.name = "Juan Pérez López"
AND m.name = "María García Rodríguez"
MERGE (n)-[:amigo]->(m)



MATCH (n:Doctor), (m:Doctor)
WHERE n.name = "Juan Pérez López"
AND m.name = "Dr Admin"
MERGE (n)-[:amigo]->(m)



//ver amigos

MATCH (d:Doctor {name: "Juan Pérez López"})-[:amigo]->(amigo)
RETURN amigo


CREATE (p:Publicacion {
  autor: "Juan Pérez López",
  fecha: "2023-12-28T10:00:00",
  contenido: "En este artículo, comparto los últimos avances en medicina general, enfocándome en las nuevas terapias para enfermedades crónicas. La medicina general está evolucionando rápidamente, y es crucial estar al día con las últimas investigaciones y técnicas."
})

MATCH (juan:Doctor { name: "Juan Pérez López" }), (p:Publicacion { autor: "Juan Pérez López" })
MERGE (juan)-[:Publicó]->(p)


//Eliminar relaciones
MATCH ()-[r]-() DELETE r
// eliminar todos los elementos
MATCH (n) DELETE n


