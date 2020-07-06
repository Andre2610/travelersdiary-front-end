import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewTrip } from "../Store/trips/actions";
import { NewPost } from "../Types/model";
import {
  Flex,
  Text,
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
  const { id } = useParams();
  const dispatch = useDispatch();

  function getLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position: any) {
    set_newPost({ ...newPost, latitude: position.coords.latitude });
    set_newPost({ ...newPost, longitude: position.coords.longitude });
  }
  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const [newPost, set_newPost] = useState<NewPost>({
    latitude: 0,
    longitude: 0,
    title: "",
    content: "",
    pictures: [],
    tripId: id,
  });

  console.log("new post state", newPost);
  function submitHandler(e: any) {
    e.preventDefault();
    // const { tripTitle, startDate, endDate } = tripDetails;
    // if (!tripTitle || !startDate) {
    //   console.log("unhappy path, send message to user");
    // } else {
    //   dispatch(createNewTrip(tripDetails));
    //   set_tripDetails({
    //     tripTitle: "",
    //     startDate: "",
    //     endDate: "",
    //   });
    // }
  }
  useEffect(() => {
    getLocation();
  }, [id]);
  return (
    <>
      <Button onClick={onOpen} minW="7vw" className="navbtn">
        New Post
      </Button>
      <Modal scrollBehavior="outside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          alignItems="center"
          minW="90vw"
          minH="60vh"
          h="auto"
          maxH="90vh"
          style={{ backgroundColor: "#E3EBFF" }}
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
                    variant="flushed"
                    isRequired
                    value={newPost.title}
                    onChange={(e: any) =>
                      set_newPost({
                        ...newPost,
                        title: e.target.value,
                      })
                    }
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup h="10vh">
                <Flex d="column" style={{ height: "10vh", width: "100%" }}>
                  <FormLabel htmlFor="date" className="modalLabel">
                    Share your thoughts:
                  </FormLabel>
                  <Input
                    as="textarea"
                    minW="80%"
                    h="20vh"
                    variant="flushed"
                    isRequired
                    value={newPost.content}
                    onChange={(e: any) =>
                      set_newPost({
                        ...newPost,
                        content: e.target.value,
                      })
                    }
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            {/* <FormControl>
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
            </FormControl> */}
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
