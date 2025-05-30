const express = require('express');
const app = express()
const {infoCurso} = require('./curso.js');
const { json } = require('body-parser');
app.use(express.json());

const { infoCurso } = require('./curso.js');

app.get('/', (req, res) => {
    res.send('mi primer servidor. cursos 🐱‍👤');
});


//matematicas
function  enviarCursoMatematicas () {
    const CursoMatematicas ={
         id: 2,
            titulo: 'aprende algebra',
            tema: 'algebra',
            vistas: 15722,
            nivel: 'intermedio'
    }
    
    fetch("https://matematicas.com/api/cursos", {
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: json.stringfy(infoCurso)
    
    })
    .then(response => response.json())
    .then(data => {
        console.log("curso enviado", data);
    })

    .catch(error => {
        console.error("error:", error);
    })
}

enviarCursoMatematicas();

//programacion

function enviarCursoProgramacion () {
    const CursoProgramacion = {
        id: 3,
            titulo: 'aprende python avanzado',
            lenguaje: 'python',
            vistas: 34567,
            nivel: 'avanzado' 
    };
    fetch("https:/7programacion.com/api/curso", {
        method:"POST",
        headers: {
            "content-type": "aplication/json"
        },
        body:json.stringfy(CursoProgramacion)

    })
    .then(response => response.json())
    .then(data => {
        console.log("curso emnviado:", data);
    })
    .catch(error => {
        console.error("error:", error);
    })
    
}
enviarCursoProgramacion()

// PUT: Actualizar tema de un curso de programación por ID
app.put('/programacion/:id', (req, res) => {
    const tema_actualizado = req.body.tema;
    const id = parseInt(req.params.id);

    const curso = infoCurso.programamacion.find(curso => curso.id === id);
    if (!curso) {
        return res.status(404).send('Curso no encontrado.');
    }
    curso.tema = tema_actualizado;
    res.json(curso);
});

// DELETE: Eliminar curso de inglés por ID
app.delete('/ingles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = infoCurso.ingles.findIndex(curso => curso.id === id);

    if (indice === -1) {
        return res.status(404).send('Curso no encontrado.');
    }

    const cursoEliminado = infoCurso.ingles.splice(indice, 1);
    res.json(cursoEliminado);
});



const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`el servidor esta iniciando procesos en el puerto ${PUERTO}...`);
});
