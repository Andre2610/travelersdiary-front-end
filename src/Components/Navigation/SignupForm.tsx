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
} from "@chakra-ui/core";

export default function SignupForm(props: any) {
  const { onClose, set_ModalForm } = props;

  return (
    <>
      <ModalContent
        alignItems="center"
        maxH="auto"
        style={{ backgroundColor: "#F6F0C6" }}
      >
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody w="75%" m="auto">
          <FormControl isRequired>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="text">First Name</FormLabel>
                <Input
                  type="text"
                  placeholder="First Name"
                  variant="flushed"
                  isRequired
                />
              </Flex>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="text">Last Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Last Name"
                  variant="flushed"
                  isRequired
                />
              </Flex>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="email">Email</FormLabel>
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
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
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
          <FormControl isRequired>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="text">Homepage title</FormLabel>
                <Input
                  type="text"
                  placeholder="Your homepage title"
                  variant="flushed"
                  isRequired
                />
              </Flex>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="text">A line to describe you</FormLabel>
                <Input
                  type="text"
                  placeholder="Tell us a line about you"
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
          <Text size="xsm">
            Already have an account? Log in{" "}
            <span
              onClick={(e) => set_ModalForm("Login")}
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