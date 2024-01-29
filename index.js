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

<<<<<<< Updated upstream

=======
server.put("/:valor", (req,res) =>{
>>>>>>> Stashed changes

// PUT update data by id
app.put('/data/:id', (req, res) => {
    const item = data.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    item.name = req.body.name;
    item.Personaje = req.body.Personaje;
    res.json(item);
});


app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
});