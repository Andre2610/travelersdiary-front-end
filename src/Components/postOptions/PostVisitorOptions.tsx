import React from "react";
import { Flex, Divider, Button } from "@chakra-ui/core";

export default function PostVisitorOptions() {
  return (
    <>
      <Divider width="95%" marginX="auto" marginBottom="0.5rem" />
      <Flex width="30vw" margin="auto" justify="space-around">
        <Button minWidth="10vw" className="navbtn" variantColor="customBtn">
          Like
        </Button>
        <Button minWidth="10vw" className="navbtn" variantColor="customBtn">
          Comment
        </Button>
      </Flex>
    </>
  );
}
