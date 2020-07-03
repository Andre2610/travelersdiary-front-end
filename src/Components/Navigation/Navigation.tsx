import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../Store/users/selector";
import { Flex, Text, Button } from "@chakra-ui/core";
import ModalToogle from "./ModalToogle";
import Logout from "./Logout";

export default function Navbar() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const loggedIn = token ? <Logout /> : <ModalToogle />;
  const userProfile = token ? (
    <NavLink to="/">
      <Button minW="7vw">{user.firstName}</Button>
    </NavLink>
  ) : null;

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
        {userProfile}
        {loggedIn}
      </Flex>
    </Flex>
  );
}
