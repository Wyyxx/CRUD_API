const express = require('express');
const app = express();
const port = 3000;

let data = [
    { id: 1, name: 'Spiderman', Personaje: 'Peter Parker' },
    { id: 2, name: 'Iron Man', Personaje: 'Tony Stark' },
    { id: 3, name: 'Guardianes de la Galaxia', Personaje: 'Star Lord' },
    { id: 4, name: 'Avengers', Personaje: 'Tanatos' },
];

app.use(express.json());
app.use(express.static('public'));


    // PUT update data by id
    app.put('/data/:id', (req, res) => {
        const item = data.find(i => i.id === parseInt(req.params.id));
        if (!item) return res.status(404).send('Item not found');
        item.name = req.body.name;
        item.Personaje = req.body.Personaje;
        res.json(item);
    });

    // delete por datos por id 
    app.delete('/data/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = data.findIndex(item => item.id === id);

        if (index !== -1) {
            data.splice(index, 1);
            res.json({ message: 'Datos eliminados correctamente' });
        } else {
            res.status(404).json({ error: 'Datos no encontrados' });
        }
    });

    // delete personaje por id
    app.delete('/personaje/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = data.findIndex(item => item.id === id);

        if (index !== -1) {
            data.splice(index, 1);
            res.json({ message: 'Personaje eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Personaje no encontrado' });
        }
    });


    app.listen(port, () => {
    console.log('Server is running in http://localhost:${port}');
});