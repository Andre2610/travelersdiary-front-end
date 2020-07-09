import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Credentials } from "../../Types/model";
import { login } from "../../Store/users/actions";
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
} from "@chakra-ui/core";
import { showMessageWithTimeout } from "../../Store/appState/actions";
import "../../Style/GenStyle.scss";

export default function LogInForm(props: any) {
  const { onClose, set_ModalForm } = props;
  const [credentials, set_credentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  function submitHandler(event: any) {
    event.preventDefault();
    const { email, password } = credentials;
    if (!email || !password) {
      const message = "Email or password incorrect";
      dispatch(showMessageWithTimeout("error", true, message, 3000));
    } else {
      dispatch(login(credentials));
      set_credentials({
        email: "",
        password: "",
      });
    }
  }
  return (
    <>
      <ModalContent alignItems="center" maxH="auto">
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
                  value={credentials.email}
                  onChange={(e: any) =>
                    set_credentials({ ...credentials, email: e.target.value })
                  }
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
                  value={credentials.password}
                  onChange={(e: any) =>
                    set_credentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                />
              </Flex>
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            minW="7vw"
            className="navbtn"
            mr={3}
            onClick={(e) => submitHandler(e)}
            variantColor="customRed"
          >
            Log in
          </Button>
          <Button
            minW="7vw"
            className="navbtn"
            onClick={onClose}
            variantColor="customRed"
          >
            Close
          </Button>
        </ModalFooter>
        <Box>
          <Text as="span" size="sm">
            Don't have an account yet? Sign up{" "}
            <Text
              as="span"
              onClick={(e) => set_ModalForm("Signup")}
              style={{ cursor: "pointer" }}
              color="blue.500"
            >
              HERE
            </Text>
          </Text>
        </Box>
      </ModalContent>
    </>
  );
}
