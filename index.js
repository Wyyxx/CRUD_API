const express = require('express');
const app = express();

app.use(express.json());

let peliculas = [];
let idPelicula = 1;

app.post('/peliculas', (req, res) => {
    const nuevaPelicula = { id: idPelicula++, ...req.body };
    peliculas.push(nuevaPelicula);
    res.json({ mensaje: 'Película agregada con éxito', pelicula: nuevaPelicula });
});

app.post('/peliculas/:id', (req, res) => {
    const idPelicula = parseInt(req.params.id);
    const datosActualizados = req.body;


    const pelicula = peliculas.find(p => p.id === idPelicula);
    if (pelicula) {
        pelicula.titulo = datosActualizados.titulo || pelicula.titulo;
        pelicula.director = datosActualizados.director || pelicula.director;
        res.json({ mensaje: 'Información de la película actualizada con éxito', pelicula });
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
});

const puerto = 3000;
app.listen(puerto, () => {
    console.log(`La API de películas está escuchando en http://localhost:${puerto}`);
});

