var telefonos = require("./agenda");
const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();
app.use(bodyParser.json());

app.get("/api/persons", function (req, res) {
  res.json(telefonos);
});

app.get("/api/info", function (req, res) {
  res.send(
    `Actualmente existe en la agenda ${telefonos.length} personas.` +
      "<br> Su solicitud fue realizada a el día: " +
      Date.now()
  );
});

app.get("/api/persons/:id", function (req, res) {
  const id = Number(req.params.id);
  console.log(id);
  const result = telefonos.find((x) => x.id === id) ? true : false;
  console.log(result);
  if (result) {
    res.json(telefonos.find((x) => x.id === id));
  } else {
    res.send("la persona indicada no existe");
  }
});

app.delete("/api/borrar/:id", function (req, res) {
  const id = Number(req.params.id);
  console.log(id);
  const result = telefonos.find((x) => x.id === id) ? true : false;

  if (result) {
    telefonos = telefonos.filter((x) => x.id !== id);
    console.log(telefonos);
    res.json(telefonos);
    res.status(204).end();
  } else {
    res.send("la persona indicada no existe");
  }
});

app.post("/api/nuevaPersona", function (req, res) {
  console.log(req.body);
  const persona = req.body;
  console.log(persona);

  let ultimoId = Math.max(...telefonos.map((x) => x.id));
  console.log(ultimoId);

  if (persona) {
    const nuevaPersona = {
      id: ++ultimoId,
      name: persona.name,
      number: persona.number,
    };

    telefonos.push(nuevaPersona);
    res.json(telefonos);
    res.status(200);
  }

  res.status(200);
});

app.put("/api/modificar/:id", function (req, res) {
  const id = Number(req.params.id);
  const persona = req.body;
  console.log(persona);

  if (id) {
    let pers = telefonos.find((x) => x.id === id);
    pers.name = persona.name;
    pers.number = persona.number;

    console.log(pers);

    res.json(telefonos);
    res.status(200);
  } else {
    res.send("No se ingresó persona");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
