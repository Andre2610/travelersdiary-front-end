import React from "react";
import {
  Flex,
  Text,
  Button,
  Box,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  CSSReset,
} from "@chakra-ui/core";

export default function LogInForm(props: any) {
  const { onClose, set_ModalForm } = props;

  return (
    <>
      <ModalContent
        alignItems="center"
        maxH="auto"
        style={{ backgroundColor: "#F6F0C6" }}
      >
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody m="auto" w="80%">
          <FormControl isRequired>
            <InputGroup h="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="email" w="10%">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  variant="flushed"
                  isRequired
                />
              </Flex>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup h="10vh">
              <Flex d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  variant="flushed"
                  isRequired
                />
              </Flex>
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variantColor="blue" mr={3}>
            Log in
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
        <Box>
          <Text as="span" size="sm">
            Don't have an account yet? Sign up{" "}
            <span
              onClick={(e) => set_ModalForm("Signup")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              HERE
            </span>
          </Text>
        </Box>
      </ModalContent>
    </>
  );
}
