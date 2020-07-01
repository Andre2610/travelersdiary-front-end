import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/core";

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
          <Button>
            <NavLink to="/">Home</NavLink>
          </Button>
        </Text>
        <Text>
          <Button>Log in</Button>
        </Text>
      </Flex>
    </Flex>
  );
}
