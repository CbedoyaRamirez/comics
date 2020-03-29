import React, { useState, useEffect } from "react";
import { Form, Image, Spinner } from "react-bootstrap";
import axios from "axios";

function useObtenerComics(numeroComic) {
  const [comic, setComic] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://xkcd.com/" +
          numeroComic +
          "/info.0.json"
      )
      .then(resul => {
        setComic(resul.data);
      })
      .catch(error => console.log(error));
  }, []);

  if (!comic) {
    return <Spinner animation="border" />;
  }

  return (
    <Form>
      <Form.Group>
        <Image src={comic.img} />
      </Form.Group>
    </Form>
  );
}

export default useObtenerComics;
