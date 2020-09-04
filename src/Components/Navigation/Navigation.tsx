import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../Store/users/selector";
import { FaGithub } from "react-icons/fa";
import {
  Flex,
  Button,
  useColorMode,
  IconButton,
  Link,
  Box,
} from "@chakra-ui/core";
import ModalToogle from "./ModalToogle";
import Logout from "./Logout";
import "../../Style/GenStyle.css";

export default function Navbar() {
  function ColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <Box onClick={toggleColorMode}>
        {colorMode === "dark" ? (
          <IconButton
            variantColor="customBtn"
            icon="sun"
            aria-label="toggleMode"
            className="navbtn"
          />
        ) : (
          <IconButton
            variantColor="customBtn"
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
            variantColor="customBtn"
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
      paddingY="0.5rem"
      maxH="3.5rem"
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
          <Button ml={5} minW="7vw" className="navbtn" variantColor="customBtn">
            Traveler's Diary
          </Button>
        </NavLink>
      </Box>
      <Box w="20%" textAlign="right">
        {loggedIn()}
        <Link
          href="https://github.com/Andre2610/travelersdiary-front-end"
          isExternal
        >
          {/* 
        //@ts-ignore */}
          <IconButton
            ml={5}
            icon={FaGithub}
            variantColor="customBtn"
            className="navbtn"
          />
        </Link>
      </Box>
    </Flex>
  );
}
