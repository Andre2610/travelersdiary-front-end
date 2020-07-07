import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../Store/users/actions";
import { SignupData } from "../../Types/model";
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
import "../../Style/Navigation.scss";

export default function SignupForm(props: any) {
  const dispatch = useDispatch();
  const { onClose, set_ModalForm } = props;
  const [signUpData, set_signUpData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    title: "",
    about: "",
  });

  function submitHandler(event: any) {
    event.preventDefault();
    const { firstName, lastName, email, password } = signUpData;
    if (!firstName || !lastName || !email || !password) {
      console.log("unhappy path, send message to user");
    } else {
      dispatch(signUp(signUpData));
      set_signUpData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        title: "",
        about: "",
      });
    }
  }

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
                <FormLabel htmlFor="text" className="modalLabel">
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  placeholder="First Name"
                  variant="flushed"
                  isRequired
                  value={signUpData.firstName}
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
