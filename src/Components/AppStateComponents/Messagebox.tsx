import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage } from "../../Store/appState/selector";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/core";
import { clearMessage } from "../../Store/appState/actions";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const showMessage = message !== null;
  if (!showMessage) return null;

  return (
    <Alert
      status={message.variant}
      style={{ position: "fixed", zIndex: 60 }}
      variant="solid"
      position="absolute"
      top="4.5rem"
    >
      <AlertIcon />
      <AlertDescription>{message.text}</AlertDescription>
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
