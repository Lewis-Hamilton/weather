import React from "react";
import Modal from "./modal";
import Settings from "./settings";
import Weather from "./weather";
import Forecast from "./forecast";

export default function Home() {
  return (
    <>
      <Settings />
      <Modal />
      <Weather />
      <Forecast />
    </>
  );
}
