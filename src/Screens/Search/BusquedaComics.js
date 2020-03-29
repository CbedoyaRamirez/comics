import React, { useEffect, useState } from "react";
import { Form, Image, Spinner, Toast } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
//import useObtenerComics from "../../Utils/ObtenerComics";

import "./BusquedaComics.scss";

export default function BusquedaComics() {
  const [comic, setComic] = useState(null);
  const [nombreComic, setNombreComic] = useState("");
  const [abrir, setAbrir] = useState(false);

  useEffect(() => {
    axios
      .get("https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json")
      .then(resul => {
        setComic(resul.data);
      })
      .catch(error => console.log(error));
  }, []);

  const abrirDialogo = () => {
    setAbrir(true);
  };

  const cerrarDialogo = () => {
    setAbrir(false);
  };

  const buscarComicRandom = () => {
    let numero = Math.floor(Math.random() * (505 - 0) + 0);
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://xkcd.com/" +
          numero +
          "/info.0.json"
      )
      .then(resul => {
        cargandoComic();
        cerrarDialogo();
        setComic(resul.data);
      })
      .catch(error => mostrarMensajeError());
  };

  const buscarComicPorNumero = numero => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://xkcd.com/" +
          numero +
          "/info.0.json"
      )
      .then(resul => {
        cargandoComic();
        cerrarDialogo();
        setComic(resul.data);
      })
      .catch(error => mostrarMensajeError());
  };

  const mostrarMensajeError = () => {
    return (
      <Toast>
        <Toast.Body>No se encontro comic</Toast.Body>
      </Toast>
    );
  };

  const cargandoComic = () => {
    return <Spinner animation="border" />;
  };

  const obtenerNombreComic = event => {
    console.log(event.target.value);
    setNombreComic(event.target.value);
  };

  if (!comic) {
    return <Spinner animation="border" />;
  }

  return (
    <Form className="Busqueda-header">
      <Form.Group>
        <label>{comic.title}</label>
      </Form.Group>
      <Form.Group>
        <Form.Group>
          <Image src={comic.img} />
        </Form.Group>
      </Form.Group>
      <Form.Group>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={abrirDialogo}
        >
          Buscar por numero
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => buscarComicRandom()}
        >
          Buscar Aleatoriamente
        </Button>
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
            onChange={event => obtenerNombreComic(event)}
            id="numero"
            fullWidth
          />
          <DialogActions>
            <Button onClick={cerrarDialogo} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => buscarComicPorNumero(nombreComic)}
              color="primary"
            >
              Aceptar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
