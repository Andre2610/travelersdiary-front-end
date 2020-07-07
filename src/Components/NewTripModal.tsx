import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTrip } from "../Store/trips/actions";
import { TripDetails } from "../Types/model";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import "../Style/MyPage.scss";

export default function NewTripModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [tripDetails, set_tripDetails] = useState<TripDetails>({
    tripTitle: "",
    startDate: "",
    endDate: "",
  });
  function submitHandler(e: any) {
    e.preventDefault();
    const { tripTitle, startDate } = tripDetails;
    if (!tripTitle || !startDate) {
      console.log("unhappy path, send message to user");
    } else {
      dispatch(createNewTrip(tripDetails));
      set_tripDetails({
        tripTitle: "",
        startDate: "",
        endDate: "",
      });
    }
  }

  return (
    <>
      <Button onClick={onOpen} minW="7vw" className="navbtn">
        Start a new trip!
      </Button>
      <Modal scrollBehavior="outside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          alignItems="center"
          h="auto"
          maxH="70vh"
          style={{ backgroundColor: "#B8B08D" }}
        >
          <ModalHeader>New trip</ModalHeader>
          <ModalCloseButton />
          <ModalBody m="auto" w="80%">
            <FormControl isRequired>
              <InputGroup h="10vh">
                <Flex w="35%" d="column" style={{ height: "10vh" }}>
                  <FormLabel htmlFor="title" w="10%" className="modalLabel">
                    Title
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Trip title"
                    variant="flushed"
                    isRequired
                    value={tripDetails.tripTitle}
                    onChange={(e: any) =>
                      set_tripDetails({
                        ...tripDetails,
                        tripTitle: e.target.value,
                      })
                    }
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup h="10vh">
                <Flex d="column" style={{ height: "10vh" }}>
                  <FormLabel htmlFor="date" className="modalLabel">
                    Start date
                  </FormLabel>
                  <Input
                    type="date"
                    placeholder="When will your trip begin"
                    variant="flushed"
                    isRequired
                    value={tripDetails.startDate}
                    onChange={(e: any) =>
                      set_tripDetails({
                        ...tripDetails,
                        startDate: e.target.value,
                      })
                    }
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup h="10vh">
                <Flex d="column" style={{ height: "10vh" }}>
                  <FormLabel htmlFor="date" className="modalLabel">
                    End date
                  </FormLabel>
                  <Input
                    type="date"
                    placeholder="When will your trip begin"
                    variant="flushed"
                    isRequired
                    value={tripDetails.endDate}
                    onChange={(e: any) =>
                      set_tripDetails({
                        ...tripDetails,
                        startDate: e.target.value,
                      })
                    }
                  />
                </Flex>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              minW="7vw"
              className="navbtn"
              mr={3}
              onClick={(e) => submitHandler(e)}
            >
              Start your trip!
            </Button>
            <Button minW="7vw" className="navbtn" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
