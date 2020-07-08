import React, { useState } from "react";
import LogInForm from "./LogInForm";
import SignupForm from "./SignupForm";
import { Button, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/core";
import "../../Style/GenStyle.scss";

export default function ModalToogle() {
  const [modalForm, set_ModalForm] = useState("Login");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        minW="7vw"
        className="navbtn"
        variantColor="customRed"
      >
        Log In
      </Button>
      <Modal
        preserveScrollBarGap
        scrollBehavior="outside"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        {modalForm === "Login" ? (
          <LogInForm onClose={onClose} set_ModalForm={set_ModalForm} />
        ) : (
          <SignupForm onClose={onClose} set_ModalForm={set_ModalForm} />
        )}
      </Modal>
    </>
  );
}
