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

//--------------------------------------Inicio Get-------------------------------------//

// GET all data
app.get('/data', (req, res) => {
    res.json(data);
});

//Get personaje
app.get('/personaje/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const personaje = data.find(item => item.id === id);

    if (personaje) {
        res.json(personaje);
    } else {
        res.status(404).json({ error: 'Personaje no encontrado' });
    }
});

//--------------------------------------Fin Get-------------------------------------//

//--------------------------------------Inicio Delete-------------------------------------//

//Delete data por id
app.delete('/data/:id',(req, res)=>{
    const itemId = parseInt(req.params.id);
    data=data.filter(item =>item.id !== itemId)
    res.send(`Los datos con el id ${itemId} han sido eliminados`);
});

app.delete('/personaje/:name', (req, res) => {  const name = req.params.name;
    const index = data.findIndex(item => item.name.toLowerCase() === name.toLowerCase());

    if (index === -1) {
        return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    data.splice(index, 1);
    res.json({ message: 'Personaje eliminado exitosamente' });
});

//--------------------------------------Fin Delete-------------------------------------//

//--------------------------------------Inicio Put-------------------------------------//

// PUT actualizar name
app.put('/personaje/name/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newName = req.body.name;

    const personaje = data.find(item => item.id === id);

    if (!personaje) {
        return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    personaje.name = newName;
    res.json({ message: 'Nombre del personaje actualizado exitosamente', personaje });
});

// PUT actualizar Personaje
app.put('/personaje/personaje/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newPersonaje = req.body.Personaje;

    const personaje = data.find(item => item.id === id);

    if (!personaje) {
        return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    personaje.Personaje = newPersonaje;
    res.json({ message: 'Personaje del personaje actualizado exitosamente', personaje });
});

//--------------------------------------Fin Put-------------------------------------//

//--------------------------------------Inicio Post-------------------------------------//

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

//--------------------------------------Fin Post-------------------------------------//

app.listen(port, () => {
    console.log(`Server is running as in http://localhost:${port}`);
});

