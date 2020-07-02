import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/core";
import LoggedOut from "./LoggedOut";

export default function Navbar() {
  return (
    <Flex padding="15px" bg="teal.200">
      <Flex w="20%" justify="space-around">
        <Text>Logo</Text>
      </Flex>
      <Flex w="50%" justify="space-around">
        <Text>Search Box to be implement</Text>
      </Flex>
      <Flex float="right" w="20%" justify="space-around">
        <Text>
          <NavLink to="/">
            <Button>Home</Button>
          </NavLink>
        </Text>
        <LoggedOut />
      </Flex>
    </Flex>
  );
}
