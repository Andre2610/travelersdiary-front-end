import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../Store/users/selector";
import { Flex, Text, Button } from "@chakra-ui/core";
import ModalToogle from "./ModalToogle";

export default function Navbar() {
  const token = useSelector(selectToken);
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
        <ModalToogle />
      </Flex>
    </Flex>
  );
}
