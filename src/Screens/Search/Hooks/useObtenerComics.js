import React, { useState, useEffect } from "react";
import { Form, Image } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { obtenerNumeroAleatorio } from "../../../Utils/ObtenerNumeroAleatorio";
import BusquedaEspecifica from "../BusquedaEspecifica/BusquedaEspecificaComics";

import axios from "axios";

export default function useObtenerComics() {
  const [comicData, setComicData] = useState(null);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [numeroComic, setNumeroComic] = useState(1);

  const labels = {
    1: "No me gusta",
    2: "Feo",
    3: "Aceptable",
    4: "Bonito",
    5: "Una obra Maestra"
  };

  const buscarComicRandom = () => {
    setValue(0);
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
          <Rating
            className="MuiRating"
            size="large"
            value={value}
            precision={1}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {value !== null && <Box ml={2}>{labels[value]}</Box>}
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
        <Rating
          className="MuiRating"
          size="large"
          value={value}
          precision={1}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && <Box ml={2}>{labels[value]}</Box>}
      </Form.Group>
    </Form>
  );
}
