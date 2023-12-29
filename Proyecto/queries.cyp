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
  especialidad: "Pediatría"
  password: "contraseña456"
})


CREATE (n:Doctor {
  name: "Juan Pérez López",
  username: "juan.perez",
  email: "juan.perez@gmail.com",
  age: 35,
  especialidad: "Medicina General"
  password : "contraseña456" 
})




MATCH (juan:Doctor), (maria:Doctor)
WHERE juan.name = "Juan Pérez López"
AND maria.name = "María García Rodríguez"
MERGE (juan)-[:Amigo]->(maria)