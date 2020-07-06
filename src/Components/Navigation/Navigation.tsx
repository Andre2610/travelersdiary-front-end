import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../Store/users/selector";
import { Flex, Text, Button } from "@chakra-ui/core";
import ModalToogle from "./ModalToogle";
import Logout from "./Logout";
import "../../Style/Navigation.scss";

export default function Navbar() {
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
      bg="blue.300"
      justify="space-around"
      position="fixed"
      w="100vw"
      top="0"
    >
      <Flex w="20%" justify="space-around">
        <NavLink to="/">
          <Button minW="7vw" className="navbtn">
            Traveler's Diary
          </Button>
        </NavLink>
      </Flex>
      <Flex w="50%" justify="space-around">
        <Text></Text>
      </Flex>
      <Flex float="right" w="20%" justify="space-around">
        {/* {userProfile} */}
        {loggedIn()}
      </Flex>
    </Flex>
  );
}
