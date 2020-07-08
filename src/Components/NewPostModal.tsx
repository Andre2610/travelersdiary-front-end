import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewPost } from "../Store/trips/actions";
import { NewPost, NewPicture } from "../Types/model";
import { fetchPhotos, openUploadWidget } from "../config/CloudinaryService";

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
  Textarea,
} from "@chakra-ui/core";
import "../Style/GenStyle.scss";

let images: NewPicture = [];

export default function NewTripModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [newPost, set_newPost] = useState<NewPost>({
    latitude: 0,
    longitude: 0,
    title: "",
    content: "",
    pictures: [],
    tripId: id,
  });
  //   console.log("images state", images);

  const beginUpload = (tag: string) => {
    const uploadOptions = {
      cloudName: "dui8yvobq",
      tags: [tag],
      uploadPreset: "cloudinaryapi",
    };

    openUploadWidget(uploadOptions, (error: any, photos: any) => {
      if (!error) {
        console.log(photos);
        if (photos.event === "success") {
          // @ts-ignore
          images = [...images, photos.info.url];
          console.log("whats in images", images);
        }
      } else {
        console.log(error);
      }
    });
  };

  function getLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position: any) {
    set_newPost({
      ...newPost,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }
  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function submitHandler(e: any) {
    e.preventDefault();
    const { title, content } = newPost;
    if (!title || !content) {
      console.log("unhappy path, send message to user");
    } else {
      dispatch(createNewPost(newPost, images));
      set_newPost({
        latitude: 0,
        longitude: 0,
        title: "",
        content: "",
        pictures: [],
        tripId: id,
      });
      images = [];
    }
  }
  useEffect(() => {
    getLocation();
  }, [id]);
  return (
    <>
      <Button
        onClick={onOpen}
        minW="10vw"
        className="navbtn"
        variantColor="customRed"
      >
        New Post
      </Button>
      <Modal
        preserveScrollBarGap
        scrollBehavior="outside"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          alignItems="center"
          minW="90vw"
          minH="60vh"
          h="auto"
          maxH="90vh"
        >
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody m="auto" w="80%" position="relative">
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
                  <Textarea
                    position="relative"
                    as="textarea"
                    minW="80%"
                    h="20vh"
                    resize="vertical"
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
            <FormControl>
              <InputGroup
                h="10vh"
                position="absolute"
                style={{ bottom: 2, left: 2 }}
              >
                <Flex d="column" style={{ height: "10vh" }}>
                  <FormLabel htmlFor="date" className="modalLabel">
                    Upload your pictures
                  </FormLabel>
                  <Button
                    onClick={() => beginUpload("image")}
                    className="navbtn"
                    variantColor="customRed"
                  >
                    Choose
                  </Button>
                  {/* <Input
                    type="file"
                    placeholder="When will your trip begin"
                    variant="flushed"
                    onChange={(e: any) =>
                      set_newPost({
                        ...newPost,
                        pictures: [...newPost.pictures, e.target.value],
                      })
                    }
                  /> */}
                </Flex>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              minW="7vw"
              className="navbtn"
              variantColor="customRed"
              mr={3}
              onClick={(e) => submitHandler(e)}
            >
              Submit
            </Button>
            <Button
              minW="7vw"
              className="navbtn"
              variantColor="customRed"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
