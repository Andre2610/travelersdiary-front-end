import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../Store/users/selector";
import {
  Flex,
  Text,
  Button,
  useColorMode,
  IconButton,
  Box,
} from "@chakra-ui/core";
import ModalToogle from "./ModalToogle";
import Logout from "./Logout";
import "../../Style/GenStyle.scss";

export default function Navbar() {
  function ColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <Box onClick={toggleColorMode}>
        {/*
        // *@ts-ignore  */}
        {colorMode === "dark" ? (
          <IconButton
            variantColor="customRed"
            icon="sun"
            aria-label="toggleMode"
            className="navbtn"
          />
        ) : (
          <IconButton
            variantColor="customRed"
            className="navbtn"
            icon="moon"
            aria-label="toggleMode"
          />
        )}
      </Box>
    );
  }
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const loggedIn = () => {
    if (token) {
      return (
        <>
          <Button
            minW="7vw"
            onClick={() => history.push(`/users/${user.id}`)}
            className="navbtn"
            mr={5}
            variantColor="customRed"
          >
            {user.firstName}
          </Button>
          <Logout />
        </>
      );
    } else {
      return <ModalToogle />;
    }
  };

  return (
    <Flex
      padding="15px"
      bg="customBlue.200"
      justify="space-around"
      d="flex"
      position="fixed"
      w="100vw"
      top="0"
      style={{ zIndex: 10 }}
    >
      <Box w="20%" d="flex">
        {ColorMode()}
        <NavLink to="/">
          <Button ml={5} minW="7vw" className="navbtn" variantColor="customRed">
            Traveler's Diary
          </Button>
        </NavLink>
      </Box>
      <Box w="20%" textAlign="right">
        {loggedIn()}
      </Box>
    </Flex>
  );
}
