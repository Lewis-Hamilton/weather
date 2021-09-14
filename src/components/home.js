import React from "react";
import Modal from "./modal";
import Settings from "./settings";
import Weather from "./weather";

export default function Home() {
  return (
    <>
      <Settings />
      <Modal />
      <Weather />
    </>
  );
}
