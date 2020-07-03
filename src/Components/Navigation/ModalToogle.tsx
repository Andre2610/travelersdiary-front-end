import React, { useState } from "react";
import LogInForm from "./LogInForm";
import SignupForm from "./SignupForm";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";

export default function ModalToogle() {
  const [modalForm, set_ModalForm] = useState("Login");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Log In</Button>
      <Modal scrollBehavior="outside" isOpen={isOpen} onClose={onClose}>
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
