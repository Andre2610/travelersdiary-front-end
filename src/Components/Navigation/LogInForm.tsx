import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Credentials } from "../../Types/model";
import { useHistory } from "react-router-dom";
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
  FormErrorMessage,
  FormHelperText,
  CSSReset,
} from "@chakra-ui/core";
import "../../Style/Navigation.scss";

export default function LogInForm(props: any) {
  const { onClose, set_ModalForm } = props;
  const [credentials, set_credentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  // const token = useSelector(selectToken);
  // const history = useHistory();

  function submitHandler(event: any) {
    event.preventDefault();
    const { email, password } = credentials;
    if (!email || !password) {
      console.log("unhappy path, send message to user");
    } else {
      dispatch(login(credentials));
      set_credentials({
        email: "",
        password: "",
      });
    }
  }
  // useEffect(() => {
  //   if (token !== null) {
  //     history.push("/");
  //   }
  // }, [token, history]);

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
          <Button variantColor="blue" mr={3} onClick={(e) => submitHandler(e)}>
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
