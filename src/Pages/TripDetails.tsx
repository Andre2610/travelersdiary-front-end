import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { opencageAPIkey } from "../config/constants";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showMessageWithTimeout } from "../Store/appState/actions";
import { fetchSpecificTrip } from "../Store/trips/actions";
import { endTrip } from "../Store/users/actions";
import { selectIdTrip } from "../Store/trips/selector";
import { selectUser, selectUserTrip } from "../Store/users/selector";
import { selectAppLoading } from "../Store/appState/selector";
import { Trip, Post, DefaultMarker } from "../Types/tripTypes";
import PostCard from "../Components/postCard/PostCard";
import GoogleMaps from "../Components/GoogleMaps";
import NewPostModal from "../Components/NewPostModal";
import Loading from "../Components/AppStateComponents/Loading";
import {
  Flex,
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

  function tripControlMenu() {
    return (
      <>
        <Flex width="30vw" margin="auto" justify="space-around" mb="2rem">
          <NewPostModal />
          {!oneTrip.endDate ? (
            <Button
              className="navbtn"
              variantColor="customBtn"
              onClick={(e) => set_toggle_endDate(!toggle_endDate)}
            >
              End Trip
            </Button>
          ) : null}
        </Flex>
        <Collapse mt={4} isOpen={toggle_endDate} m="auto" w="15vw" mb={6}>
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

  useEffect(() => {
    if (!user.token) {
      dispatch(fetchSpecificTrip(id));
    }
  }, [id, user]);

  const isUser = oneTrip && user.id === oneTrip.userId;
  const isTripOver = () => {
    if (oneTrip.endDate) {
      const momentCurrentDate = moment(new Date());
      const momentEndTripDate = moment(endDate);
      if (momentCurrentDate > momentEndTripDate) return true;
    }
    return false;
  };
  const validation = oneTrip && user.token && !isTripOver() && isUser;
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
              <Box>
                <Box>
                  <TabList
                    display="block"
                    alignSelf="left"
                    w="25%"
                    position="fixed"
                    zIndex={1}
                  >
                    {oneTrip.posts
                      .sort((a, b) => a.id - b.id)
                      .map((post, i) => {
                        return (
                          <Tab
                            key={i}
                            h="auto"
                            w="100%"
                            my={5}
                            onClick={(e) => tabOnClickHandler(i, post)}
                            className="tabBtn"
                          >
                            {post.title}
                          </Tab>
                        );
                      })}
                  </TabList>
                </Box>
              </Box>
              <Box position="relative">
                <TabPanels
                  marginLeft="30%"
                  w="70%"
                  border="2px solid gray"
                  mb="2rem"
                  py="1rem"
                  className="tripCardContainer"
                >
                  <PostCard post={oneTrip.posts[postIndex]} isUser={isUser} />
                </TabPanels>
                <Flex marginLeft="30%" mb="2rem">
                  <GoogleMaps
                    posts={oneTrip.posts}
                    moveToMarker={moveToMarker}
                  />
                </Flex>
              </Box>
            </Box>
          </Tabs>
        )}
      </Box>
    );
  }
}
