import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../Store/users/selector";
import { Flex, Text, Button } from "@chakra-ui/core";
import ModalToogle from "./ModalToogle";
import Logout from "./Logout";

export default function Navbar() {
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const loggedIn = () => {
    if (token) {
      return (
        <>
          <Button minW="7vw" onClick={() => history.push(`/users/${user.id}`)}>
            {user.firstName}
          </Button>
          <Logout />
        </>
      );
    } else {
      console.log("here");
      return <ModalToogle />;
    }
  };

  return (
    <Flex padding="15px" bg="teal.200" justify="space-around">
      <Flex w="20%" justify="space-around">
        <NavLink to="/">
          <Button minW="7vw">Home</Button>
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
