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
    { id: 14, name: 'Ant-Man', personaje: 'Scott Lang' }
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

//--------------------------------------Inicio Put-------------------------------------//

// PUT update data by id
app.put('/data/:id', (req, res) => {
    const item = data.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    item.name = req.body.name;
    item.Personaje = req.body.Personaje;
    res.json(item);
});

//--------------------------------------Fin Put-------------------------------------//

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
});