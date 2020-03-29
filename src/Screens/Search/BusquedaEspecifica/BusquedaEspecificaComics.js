import React, { useState } from "react";
import { Form } from "react-bootstrap";
import UseObtenerComicsEspecifico from "./Hooks/useObtenerComicsEspecifico";

import "./BusquedaEspecificaComics.scss";

export default function BusquedaEspecificaComics() {
  return (
    <Form>
      <UseObtenerComicsEspecifico />
    </Form>
  );
}
