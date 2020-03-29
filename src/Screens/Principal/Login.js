import React from "reac";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Form } from "react-bootstrap";
import "./Login.scss";

export default function Login() {
  return (
    <Form>
      <Form.Group>
        <TextField />
        <Button />
      </Form.Group>
    </Form>
  );
}
