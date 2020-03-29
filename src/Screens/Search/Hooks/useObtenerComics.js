import React, { useState, useEffect } from "react";
import { Form, Image } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import { obtenerNumeroAleatorio } from "../../../Utils/ObtenerNumeroAleatorio";
import BusquedaEspecifica from "../BusquedaEspecifica/BusquedaEspecificaComics";

import axios from "axios";

export default function useObtenerComics() {
  const [comicData, setComicData] = useState(null);
  const [numeroComic, setNumeroComic] = useState(1);

  const buscarComicRandom = () => {
    console.log("entro");
    setNumeroComic(obtenerNumeroAleatorio());
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://xkcd.com/" +
          numeroComic +
          "/info.0.json"
      )
      .then(resul => {
        setComicData(resul.data);
      })
      .catch(error => console.log(error));
  };

  if (!comicData) {
    return (
      <Form className="Busqueda-header">
        <Form.Group>
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
      </Form>
    );
  }

  return (
    <Form className="Busqueda-header">
      <Form.Group>
        <label>{comicData.title}</label>
      </Form.Group>
      <Form.Group>
        <Image src={comicData.img} />
      </Form.Group>
      <Form.Group>
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
    </Form>
  );
}
