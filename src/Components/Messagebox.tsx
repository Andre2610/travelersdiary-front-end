import React from "react";
// import { UserMessage } from "../Types/model";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage } from "../Store/appState/selector";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/core";
import { clearMessage } from "../Store/appState/actions";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const showMessage = message !== null;
  if (!showMessage) return null;

  return (
    <Alert
      // @ts-ignore
      status={message.variant}
      style={{ zIndex: 60 }}
      variant="solid"
      position="absolute"
      top="4.5rem"
    >
      <AlertIcon />
      {/*
    //@ts-ignore */}
      <AlertDescription>{message.text}</AlertDescription>
      {/*
    //@ts-ignore */}
      {message.dismissable ? (
        <CloseButton
          onClick={() => dispatch(clearMessage())}
          position="absolute"
          right="0px"
          top="-0.5rem"
        />
      ) : null}
    </Alert>
  );
}
