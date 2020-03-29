import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

export default function useObtenerComicsEspecifico() {
  const [comicData, setComicData] = useState(null);
  const [numeroComic, setNumeroComic] = useState(1);
  const [abrir, setAbrir] = useState(false);

  const abrirDialogo = () => {
    setAbrir(true);
  };

  const cerrarDialogo = () => {
    setAbrir(false);
  };

  const changeNumeroComic = event => {
    setNumeroComic(event.target.value);
  };

  const buscarComic = () => {
    console.log("entro buscarComic " + numeroComic);
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://xkcd.com/" +
          numeroComic +
          "/info.0.json"
      )
      .then(resul => {
        cerrarDialogo();
        setComicData(resul.data);
      })
      .catch(error => alert("No se encontro Comic con ese numero"));
  };

  if (!comicData) {
    return (
      <Form className="Busqueda-header">
        <Form.Group>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={abrirDialogo}
          >
            Buscar por numero
          </Button>{" "}
        </Form.Group>

        <Form.Group>
          <Rating className="MuiRating" size="large" />
        </Form.Group>
        <Dialog
          open={abrir}
          onClose={cerrarDialogo}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Comic</DialogTitle>
          <DialogContent>
            <DialogContentText>Escribir un numero</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              onChange={event => changeNumeroComic(event)}
              id="numero"
              fullWidth
            />
            <DialogActions>
              <Button onClick={cerrarDialogo} color="primary">
                Cancelar
              </Button>
              <Button onClick={() => buscarComic(numeroComic)} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Form>
    );
  }

  return (
    <Form className="Busqueda-header">
      <Form.Group>
        <Form.Group>
          <label>{comicData.title}</label>
        </Form.Group>
        <Form.Group>
          <Image src={comicData.img} />
        </Form.Group>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={abrirDialogo}
        >
          Buscar por numero
        </Button>{" "}
      </Form.Group>

      <Form.Group>
        <Rating className="MuiRating" size="large" />
      </Form.Group>
      <Dialog
        open={abrir}
        onClose={cerrarDialogo}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Comic</DialogTitle>
        <DialogContent>
          <DialogContentText>Escribir un numero</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={event => changeNumeroComic(event)}
            id="numero"
            fullWidth
          />
          <DialogActions>
            <Button onClick={cerrarDialogo} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => buscarComic(numeroComic)} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
