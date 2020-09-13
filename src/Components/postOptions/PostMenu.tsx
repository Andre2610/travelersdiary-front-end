import React, { useState } from "react";
import NewPostModal from "../NewPostModal";
import moment from "moment";
import { useDispatch } from "react-redux";
import { showMessageWithTimeout } from "../../Store/appState/actions";
import { endTrip } from "../../Store/users/actions";
import { Trip } from "../../Types/tripTypes";
import { OnClick, OnChange } from "../../Types/eventListenerTypes";
import {
  Flex,
  Button,
  Collapse,
  FormControl,
  Input,
  InputGroup,
  FormLabel,
} from "@chakra-ui/core";

export default function PostMenu(props: { oneTrip: Trip }) {
  const [toggle_endDate, set_toggle_endDate] = useState(false);
  const [endDate, set_endDate] = useState("");
  const dispatch = useDispatch();
  const { oneTrip } = props;

  function endtrip(e: OnClick) {
    if (!endDate) {
      const message = "Please pick a date to end your trip";
      dispatch(showMessageWithTimeout("error", true, message, 3000));
    } else {
      const momentStartTripDate = moment(oneTrip.startDate);
      const momentEndTripDate = moment(endDate);
      if (momentStartTripDate > momentEndTripDate) {
        const message = "Trip can not end before the date it started!";
        dispatch(showMessageWithTimeout("error", true, message, 3000));
      } else {
        const endingTrip = { ...oneTrip, endDate };
        dispatch(endTrip(endingTrip));
        set_toggle_endDate(!toggle_endDate);
      }
    }
  }
  return (
    <>
      <Flex width="30vw" margin="auto" justify="space-around" mb="2rem">
        <NewPostModal />
        {!oneTrip.endDate ? (
          <Button
            className="navbtn"
            variantColor="customBtn"
            onClick={(e: OnClick) => set_toggle_endDate(!toggle_endDate)}
          >
            End Trip
          </Button>
        ) : null}
      </Flex>
      <Collapse mt={4} isOpen={toggle_endDate} m="auto" w="15vw" mb={6}>
        <FormControl>
          <InputGroup maxH="10vh">
            <Flex w="5vw" d="column" style={{ height: "10vh" }} m="auto" mt={2}>
              <FormLabel htmlFor="text">Please confirm the date</FormLabel>
              <Input
                type="date"
                variant="flushed"
                onChange={(e: OnChange) => set_endDate(e.target.value)}
              />
            </Flex>
          </InputGroup>
        </FormControl>
        <Flex>
          <Button
            minW="10vw"
            maxW="10vw"
            variantColor="customBtn"
            className="navbtn"
            m="auto"
            onClick={(e) => endtrip(e)}
          >
            Confirm
          </Button>
        </Flex>
      </Collapse>
    </>
  );
}
