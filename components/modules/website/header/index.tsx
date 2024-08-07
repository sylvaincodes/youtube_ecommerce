import React from "react";
import Ad from "./Ad";
import Menus from "./Menus";
import Main from "./Main";
import Col from "../../custom/Col";

export default function Header() {
  return (
    <header>
      <Col className="gap-y-2">
        <Ad />
        <Main />
        <Menus />
      </Col>
    </header>
  );
}
