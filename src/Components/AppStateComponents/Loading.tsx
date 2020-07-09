import React from "react";
import { Flex, Spinner } from "@chakra-ui/core";

export default function Loading() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      style={{ zIndex: 99 }}
    >
      <Spinner label="Loading..." size="xl" thickness="3px" />
    </Flex>
  );
}
