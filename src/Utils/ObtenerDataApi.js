import React from "react";
import axios from "axios";

export default async function obtenerDataApi(numero) {
  console.log(numero);
  try {
    const resul = await axios.get(
      "https://cors-anywhere.herokuapp.com/http://xkcd.com/" +
        numero +
        "/info.0.json"
    );
    return resul.data;
  } catch (error) {
    return console.log(error);
  }
}
