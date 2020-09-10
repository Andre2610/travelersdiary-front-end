import React from "react";
import { Flex, Divider, Button } from "@chakra-ui/core";

export default function PostOwnerOptions() {
  return (
    <>
      <Divider width="95%" marginX="auto" marginBottom="0.5rem" />
      <Flex width="30vw" margin="auto" justify="space-around">
        <Button minWidth="10vw" className="navbtn" variantColor="customBtn">
          Edit
        </Button>
        <Button minWidth="10vw" className="navbtn" variantColor="customBtn">
          Delete
        </Button>
      </Flex>
    </>
  );
}
