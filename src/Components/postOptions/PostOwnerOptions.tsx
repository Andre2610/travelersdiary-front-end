import React from "react";
import { useDispatch } from "react-redux";
import { Post } from "../../Types/tripTypes";
import { Flex, Divider, Button } from "@chakra-ui/core";
import { showMessageWithTimeout } from "../../Store/appState/actions";

export default function PostOwnerOptions(props: { post: Post }) {
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
          Edit
        </Button>
        <Button
          onClick={onClickHander}
          minWidth="10vw"
          className="navbtn"
          variantColor="customBtn"
        >
          Delete
        </Button>
      </Flex>
    </>
  );
}
