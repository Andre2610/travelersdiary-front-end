import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpecificTrip, endTrip } from "../Store/trips/actions";
import { selectIdTrip } from "../Store/trips/selector";
import { selectUser, selectUserTrip } from "../Store/users/selector";
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
import "../Style/GenStyle.scss";

export default function TripDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userTrip = useSelector(selectUserTrip(id));
  const tripFromTripReducer = useSelector(selectIdTrip(id));
  const oneTrip: Trip = userTrip ? userTrip : tripFromTripReducer;
  const [toggle_endDate, set_toggle_endDate] = useState(false);
  const [endDate, set_endDate] = useState("");
  const [postIndex, set_postIndex] = useState(0);
  const [moveToMarker, set_moveToMarker] = useState<DefaultMarker>({
    lat: 0,
    lng: 0,
  });

  function postsRender(post: Post) {
    const { title, content, pictures } = post;
    if (pictures.length > 0) {
      return (
        <Flex wrap="wrap" flexDirection="row" justify="space-evenly" w="100%">
          <Heading as="h3" size="sm" w="95%" m="auto" my={2}>
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
        <Heading as="h3" size="sm" w="95%" m="auto" my={2}>
          {title}
        </Heading>
        <Text w="95%" m="auto">
          {content}
        </Text>
      </>
    );
  }

  function googleMapsRender(posts: Post[], moveToMarker: DefaultMarker) {
    console.log("whats in posts", posts);

    //@ts-ignore
    return <GoogleMaps posts={posts} moveToMarker={moveToMarker} />;
  }

  function tripControlMenu() {
    console.log("where am i?");
    return (
      <>
        <Flex w="30vw" m="auto">
          <NewPostModal />
          <Button
            minW="10vw"
            maxW="10vw"
            className="navbtn"
            variantColor="customRed"
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
  }, [id, user]);

  if (!oneTrip) return <Heading mt="3rem">Loading...</Heading>;

  return (
    <Box w="90vw" m="auto" mt="6rem">
      <Box>
        <Heading textAlign="center" mb="4rem">
          {oneTrip.tripTitle}
        </Heading>
      </Box>
      {!oneTrip.posts[0] ? (
        <>
          <Heading textAlign="center" my="3rem">
            No Posts yet
          </Heading>
          {tripControlMenu()}
        </>
      ) : (
        <Tabs variant="soft-rounded" variantColor="gray">
          <Box w="100%">
            {user.token && !oneTrip.endDate && user.id === oneTrip.userId ? (
              <>{tripControlMenu()}</>
            ) : null}
            <Box w="25%" position="fixed">
              <TabList d="row" alignSelf="left" w="100%" position="relative">
                {oneTrip.posts
                  .sort((a: Post, b: Post) => a.id - b.id)
                  .map((post, i) => {
                    return (
                      <Tab
                        key={i}
                        color="whiteAlpha"
                        h="auto"
                        w="100%"
                        my={5}
                        onClick={(e) => tabOnClickHandler(i, post)}
                        className="navbtn"
                      >
                        {post.title}
                      </Tab>
                    );
                  })}
              </TabList>
            </Box>
            <Box m="auto" display="block" w="100%" alignSelf="right">
              <TabPanels
                float="right"
                w="70%"
                border="2px solid gray"
                mb="2rem"
              >
                {postsRender(oneTrip.posts[postIndex])}
              </TabPanels>
              <Flex float="right" mb="2rem">
                {googleMapsRender(oneTrip.posts, moveToMarker)}
              </Flex>
            </Box>
          </Box>
        </Tabs>
      )}
    </Box>
  );
}
