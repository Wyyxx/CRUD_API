const express = require('express');
const app = express();
const port = 3000;

let data = [
    { id: 1, name: 'Spiderman', Personaje: 'Peter Parker' },
    { id: 2, name: 'Iron Man', Personaje: 'Tony Stark' },
    { id: 3, name: 'Guardianes de la Galaxia', Personaje: 'Star Lord' },
    { id: 4, name: 'Avengers', Personaje: 'Tanatos' },
    { id: 5, name: 'Hulk', personaje: 'Bruce Banner' },
    { id: 6, name: 'Black Widow', personaje: 'Natasha Romanoff' },
    { id: 7, name: 'Thor', personaje: 'Thor Odinson' },
    { id: 8, name: 'Captain America', personaje: 'Steve Rogers' },
    { id: 9, name: 'Doctor Strange', personaje: 'Stephen Strange' },
    { id: 10, name: 'Wolverine', personaje: 'Logan' },
    { id: 11, name: 'Storm', personaje: 'Ororo Munroe' },
    { id: 12, name: 'Deadpool', personaje: 'Wade Wilson' },
    { id: 13, name: 'Scarlet Witch', personaje: 'Wanda Maximoff' },
    { id: 14, name: 'Ante', personaje: 'Scott Lang' }
];

app.use(express.json());
app.use(express.static('public'));

app.post('/personajes', (req, res) => {
    const maxId = Math.max(...data.map(item => item.id));
    const nuevoPersonaje = { id: maxId + 1, name: req.body.name, Personaje: req.body.Personaje };
    data.push(nuevoPersonaje);
    res.json({ mensaje: 'Personaje agregado con éxito', personaje: nuevoPersonaje });
});

app.post('/personajes/:id', (req, res) => {
    const idPersonaje = parseInt(req.params.id);
    const datosActualizados = req.body;

    const personaje = data.find(p => p.id === idPersonaje);
    if (personaje) {
        personaje.name = datosActualizados.name || personaje.name;
        personaje.Personaje = datosActualizados.Personaje || personaje.Personaje;
        res.json({ mensaje: 'Información del personaje actualizada con éxito', personaje });
    } else {
        res.status(404).json({ mensaje: 'Personaje no encontrado' });
    }
});

const puerto = 3000;
app.listen(puerto, () => {
    console.log(`La API de películas está escuchando en http://localhost:${puerto}`);
});

