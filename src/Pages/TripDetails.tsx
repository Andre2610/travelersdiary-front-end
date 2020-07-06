import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpecificTrip, endTrip } from "../Store/trips/actions";
import { selectIdTrip } from "../Store/trips/selector";
import { selectUser } from "../Store/users/selector";
import { Trip, Post, Picture, DefaultMarker } from "../Types/model";
import Slider from "../Components/slider";
import GoogleMaps from "../Components/GoogleMaps";
import NewPostModal from "../Components/NewPostModal";
import {
  Flex,
  Text,
  Box,
  Heading,
  Button,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  Collapse,
  FormControl,
  Input,
  InputGroup,
  FormLabel,
} from "@chakra-ui/core";
import "../Style/MyPage.scss";

export default function TripDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const oneTrip: Trip = useSelector(selectIdTrip(id));
  const user = useSelector(selectUser);
  const [toggle_endDate, set_toggle_endDate] = useState(false);
  const [endDate, set_endDate] = useState("");
  const [postIndex, set_postIndex] = useState(0);
  const [moveToMarker, set_moveToMarker] = useState<DefaultMarker>({
    lat: 0,
    lng: 0,
  });

  function postsRender(title: string, content: string, pictures: Picture[]) {
    if (pictures.length > 0) {
      return (
        <Flex wrap="wrap" flexDirection="row" justify="space-evenly" w="100%">
          <Heading as="h3" size="sm" w="95%" m="auto" mb="1.5rem">
            {title}
          </Heading>
          <Text w="45%">{content}</Text>
          <Box float="right" w="45%">
            <Slider pictures={pictures} />
          </Box>
        </Flex>
      );
    }
    return (
      <>
        <Heading as="h3" size="sm" w="100%" m="auto">
          {title}
        </Heading>
        <Text w="100%">{content}</Text>
      </>
    );
  }

  function googleMapsRender(posts: Post[], moveToMarker: DefaultMarker) {
    //@ts-ignore
    return <GoogleMaps posts={posts} moveToMarker={moveToMarker} />;
  }

  function tabOnClickHandler(tabIndex: number, post: Post) {
    set_moveToMarker({
      lat: post.latitude,
      lng: post.latitude,
    });
    console.log("my tabindex", tabIndex);
    set_postIndex(tabIndex);
  }
  function endtrip(e: any) {
    e.preventDefault();
    if (!endDate) {
      console.log("unhappy path, send message to user");
    } else {
      const endingTrip = { ...oneTrip, endDate };
      dispatch(endTrip(endingTrip));
    }
  }

  useEffect(() => {
    if (!oneTrip) {
      dispatch(fetchSpecificTrip(id));
    }
  }, [id]);

  if (!oneTrip) return <Heading mt="3rem">Loading...</Heading>;

  return (
    <Flex flexDirection="column" justify="center" w="80vw" m="auto" mt="3rem">
      <Flex
        w="100%"
        justify="space-evenly"
        my="3rem"
        textAlign="center"
        bg="blue.100"
        maxH="60vh"
        minH="40vh"
      >
        <Box w="50%">
          <Heading as="h2" mb="2rem">
            {oneTrip.tripTitle}
          </Heading>
          {!oneTrip.posts[0] ? (
            <>
              <Heading mt="3rem">No Posts yet</Heading>
            </>
          ) : (
            <Tabs variant="soft-rounded" variantColor="cyan">
              <Flex w="100%" flexDirection="row" justify="space-around">
                <TabList d="row" alignSelf="left" w="35%">
                  {oneTrip.posts
                    .sort((a: Post, b: Post) => a.id - b.id)
                    .map((post, i) => {
                      return (
                        <Tab
                          key={i}
                          h="4rem"
                          w="95%"
                          onClick={(e) => tabOnClickHandler(i, post)}
                        >
                          {i + 1}
                        </Tab>
                      );
                    })}
                </TabList>
                <TabPanels float="right" w="60%">
                  {/* {console.log(
                    "what is this",
                    oneTrip.posts[postIndex].pictures
                  )} */}
                  <Slider pictures={oneTrip.posts[postIndex].pictures} />;
                </TabPanels>
              </Flex>
            </Tabs>
          )}
        </Box>
        {/* <Box w="40%" justifyContent="center" alignItems="center" mt=".5rem">
            {googleMapsRender(oneTrip.posts, moveToMarker)}
          </Box> */}
      </Flex>

      {user.token && !oneTrip.endDate && user.id === oneTrip.userId ? (
        <>
          <Flex w="30vw" m="auto">
            <NewPostModal />
            <Button
              minW="10vw"
              maxW="10vw"
              className="btn"
              m="auto"
              onClick={(e) => set_toggle_endDate(!toggle_endDate)}
            >
              End Trip
            </Button>
          </Flex>
          <Collapse mt={4} isOpen={toggle_endDate} m="auto" w="15vw">
            <FormControl>
              <InputGroup maxH="10vh">
                <Flex
                  w="5vw"
                  d="column"
                  style={{ height: "10vh" }}
                  m="auto"
                  mt={2}
                >
                  <FormLabel htmlFor="text">Please confirm the date</FormLabel>
                  <Input
                    type="date"
                    variant="flushed"
                    onChange={(e: any) => set_endDate(e.target.value)}
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <Flex>
              <Button
                minW="10vw"
                maxW="10vw"
                className="btn"
                m="auto"
                onClick={(e) => endtrip(e)}
              >
                Confirm
              </Button>
            </Flex>
          </Collapse>
        </>
      ) : null}
      {oneTrip.posts
        .sort((a, b) => a.id - b.id)
        .map((post) => {
          const { id, title, content, latitude, longitude, pictures } = post;
          return (
            <Box
              key={id}
              bg="blue.100"
              w="60vw"
              //   maxH="35vh"
              m="auto"
              p="15px"
              my="3vh"
              border="3px solid black"
              overflow="hidden"
            >
              <Box color="black.500">
                {postsRender(title, content, pictures)}
              </Box>
              <Flex justify="space-around" pt="1rem">
                {/* <Button
                  className="visitTrip"
                  bg="red.500"
                  color="blue.100"
                  w="20%"
                  //   onClick={(e) => visitTripOnClickHandler(id)}
                >
                  Read more!
                </Button> */}
              </Flex>
            </Box>
          );
        })}
    </Flex>
  );
}
