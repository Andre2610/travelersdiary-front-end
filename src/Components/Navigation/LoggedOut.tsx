import React from "react";
import {
  Stack,
  Flex,
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

export default function LoggedOut() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Log In</Button>
      <Modal scrollBehavior="outside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems="center" maxH="50vh">
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="75%" m="auto">
            <InputGroup maxH="10vh">
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  variant="flushed"
                  isRequired
                ></Input>
              </FormControl>
            </InputGroup>
            <InputGroup maxH="10vh">
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  variant="flushed"
                  isRequired
                ></Input>
              </FormControl>
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3}>
              Log in
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
