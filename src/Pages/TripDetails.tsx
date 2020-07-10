import React, { useState, useEffect } from "react";
import axios from "axios";
import { opencageAPIkey } from "../config/constants";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showMessageWithTimeout } from "../Store/appState/actions";
import { fetchSpecificTrip, endTrip } from "../Store/trips/actions";
import { selectIdTrip } from "../Store/trips/selector";
import { selectUser, selectUserTrip } from "../Store/users/selector";
import { selectAppLoading } from "../Store/appState/selector";
import { Trip, Post, DefaultMarker } from "../Types/model";
import Slider from "../Components/slider";
import GoogleMaps from "../Components/GoogleMaps";
import NewPostModal from "../Components/NewPostModal";
import Loading from "../Components/AppStateComponents/Loading";
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
import "../Style/GenStyle.css";

export default function TripDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectAppLoading);
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
    address: "",
    flag: "",
  });
  async function reverseGeoCode(lat: number, lng: number) {
    const res = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${opencageAPIkey}`
    );
    set_moveToMarker({
      lat: lat,
      lng: lng,
      address: res.data.results[0].formatted,
      flag: res.data.results[0].annotations.flag,
    });
  }

  function postsRender(post: Post) {
    const { title, content, pictures } = post;

    const paragraphs = content
      ? content.split("\n")
      : ["Something went wrong, dont yell at me!"];
    if (pictures.length > 0) {
      return (
        <Flex wrap="wrap" flexDirection="row" justify="space-around">
          <Heading as="h3" size="sm" w="95%" m="auto" mt="1rem" mb="0.5rem">
            {title}
          </Heading>
          <Box w="45%">
            {paragraphs.map((paragraph, i) => (
              <Text key={i} my="0.5rem" w="100%">
                {paragraph}
              </Text>
            ))}
          </Box>
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
        {paragraphs.map((paragraph, i) => (
          <Text key={i} m="auto" w="95%" my="0.5rem">
            {paragraph}
          </Text>
        ))}
      </>
    );
  }

  function googleMapsRender(posts: Post[], moveToMarker: DefaultMarker) {
    //@ts-ignore
    return <GoogleMaps posts={posts} moveToMarker={moveToMarker} />;
  }

  function tripControlMenu() {
    return (
      <>
        <Flex w="30vw" m="auto" justify="space-around" mb="2rem">
          <NewPostModal />
          <Button
            minW="10vw"
            maxW="10vw"
            className="navbtn"
            variantColor="customBtn"
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

  function tabOnClickHandler(tabIndex: number, post: Post) {
    const { latitude, longitude } = post;
    reverseGeoCode(latitude, longitude);

    set_postIndex(tabIndex);
  }

  function endtrip(e: any) {
    // e.preventDefault();
    if (!endDate) {
      const message = "Please pick a date to end your trip";
      dispatch(showMessageWithTimeout("error", true, message, 3000));
    } else {
      const endingTrip = { ...oneTrip, endDate };
      dispatch(endTrip(endingTrip));
      set_toggle_endDate(!toggle_endDate);
    }
  }

  useEffect(() => {
    if (!user.token) {
      dispatch(fetchSpecificTrip(id));
    }
  }, [id, user]);

  const isUser = oneTrip && user.id === oneTrip.userId;
  const validation = oneTrip && user.token && !oneTrip.endDate && isUser;
  const menu = validation ? tripControlMenu() : null;

  if (loading) {
    return <Loading />;
  } else {
    if (!oneTrip) return <Loading />;

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
            {menu}
          </>
        ) : (
          <Tabs variant="soft-rounded" variantColor="customTab">
            <Box w="100%">
              {menu}
              <Box w="25%">
                <Box w="25%" position="fixed">
                  <TabList
                    d="row"
                    alignSelf="left"
                    w="100%"
                    position="relative"
                  >
                    {oneTrip.posts
                      .sort((a: Post, b: Post) => a.id - b.id)
                      .map((post, i) => {
                        return (
                          <Tab
                            key={i}
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
              </Box>
              <Box m="auto" display="block" w="100%" alignSelf="right">
                <TabPanels
                  float="right"
                  w="70%"
                  border="2px solid gray"
                  mb="2rem"
                  py="1rem"
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
}
