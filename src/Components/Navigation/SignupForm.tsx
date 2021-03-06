import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../Store/users/actions";
import { SignupData } from "../../Types/userTypes";
import { OnClick, OnChange } from "../../Types/eventListenerTypes";
import { showMessageWithTimeout } from "../../Store/appState/actions";
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
import "../../Style/GenStyle.css";

export default function SignupForm(props: any) {
  const dispatch = useDispatch();
  const initialState: SignupData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    title: "",
    about: "",
  };
  const { onClose, set_ModalForm } = props;
  const [signUpData, set_signUpData] = useState<SignupData>(initialState);

  function submitHandler(event: OnClick) {
    event.preventDefault();
    const { firstName, lastName, email, password } = signUpData;
    if (!firstName || !lastName || !email || !password) {
      const message = "Please fill in all the required fields";
      dispatch(showMessageWithTimeout("error", true, message, 3000));
    } else {
      dispatch(signUp(signUpData));
      set_signUpData(initialState);
    }
  }

  return (
    <>
      <ModalContent alignItems="center" maxH="auto">
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody w="75%" m="auto">
          <FormControl isRequired>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="text" className="modalLabel">
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  placeholder="First Name"
                  variant="flushed"
                  isRequired
                  value={signUpData.firstName}
                  onChange={(e: OnChange) =>
                    set_signUpData({ ...signUpData, firstName: e.target.value })
                  }
                />
              </Flex>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="text" className="modalLabel">
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Last Name"
                  variant="flushed"
                  isRequired
                  value={signUpData.lastName}
                  onChange={(e: OnChange) =>
                    set_signUpData({ ...signUpData, lastName: e.target.value })
                  }
                />
              </Flex>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="email" className="modalLabel">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  variant="flushed"
                  isRequired
                  value={signUpData.email}
                  onChange={(e: OnChange) =>
                    set_signUpData({ ...signUpData, email: e.target.value })
                  }
                />
              </Flex>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="password" className="modalLabel">
                  Password
                </FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  variant="flushed"
                  isRequired
                  value={signUpData.password}
                  onChange={(e: OnChange) =>
                    set_signUpData({ ...signUpData, password: e.target.value })
                  }
                />
              </Flex>
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="text" className="modalLabel">
                  Homepage title
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Your homepage title"
                  variant="flushed"
                  value={signUpData.title}
                  onChange={(e: OnChange) =>
                    set_signUpData({ ...signUpData, title: e.target.value })
                  }
                />
              </Flex>
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup maxH="10vh">
              <Flex w="35%" d="column" style={{ height: "10vh" }}>
                <FormLabel htmlFor="text" className="modalLabel">
                  A line to describe you
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Tell us a line about you"
                  variant="flushed"
                  value={signUpData.about}
                  onChange={(e: OnChange) =>
                    set_signUpData({ ...signUpData, about: e.target.value })
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
          >
            Submit
          </Button>
          <Button minW="7vw" className="navbtn" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
        <Box>
          <Text size="xsm">
            Already have an account? Log in{" "}
            <Text
              as="span"
              onClick={(e) => set_ModalForm("Login")}
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
