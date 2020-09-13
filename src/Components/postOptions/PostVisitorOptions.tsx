import React from "react";
import { useDispatch } from "react-redux";
import { Flex, Divider, Button } from "@chakra-ui/core";
import { showMessageWithTimeout } from "../../Store/appState/actions";

export default function PostVisitorOptions() {
  const dispatch = useDispatch();

  const onClickHander = () => {
    const message = "Feature not implement yet, but coming soon!";
    dispatch(showMessageWithTimeout("info", false, message, 1500));
  };

  return (
    <>
      <Divider width="95%" marginX="auto" marginBottom="0.5rem" />
      <Flex width="30vw" margin="auto" justify="space-around">
        <Button
          onClick={onClickHander}
          minWidth="10vw"
          className="navbtn"
          variantColor="customBtn"
        >
          Like
        </Button>
        <Button
          onClick={onClickHander}
          minWidth="10vw"
          className="navbtn"
          variantColor="customBtn"
        >
          Comment
        </Button>
      </Flex>
    </>
  );
}
