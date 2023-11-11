const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "comida_tipica"
});

app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;
    const ciudad = req.body.ciudad;
    const region = req.body.region;
    const descripcion = req.body.descripcion;

    db.query('INSERT INTO comida_tipica(nombre, tipo, ciudad, region, descripcion) VALUES(?,?,?,?,?)', [nombre, tipo, ciudad, region, descripcion],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/comida", (req, res) => {
    const ciudad = req.query.ciudad; 

    if (ciudad) {
        db.query('SELECT * FROM comida_tipica WHERE ciudad = ?', ciudad, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al buscar comidas por ciudad' });
            } else {
                res.send(result);
            }
        });
    } else {
        db.query('SELECT * FROM comida_tipica', (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al obtener todas las comidas' });
            } else {
                res.send(result);
            }
        });
    }
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});
