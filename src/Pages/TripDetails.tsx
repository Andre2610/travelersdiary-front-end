import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { opencageAPIkey } from "../config/constants";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpecificTrip } from "../Store/trips/actions";
import { selectIdTrip } from "../Store/trips/selector";
import { selectUser, selectUserTrip } from "../Store/users/selector";
import { selectAppLoading } from "../Store/appState/selector";
import { Trip, Post, DefaultMarker } from "../Types/tripTypes";
import PostCard from "../Components/postCard/PostCard";
import PostMenu from "../Components/postOptions/PostMenu";
import GoogleMaps from "../Components/GoogleMaps";
import Loading from "../Components/AppStateComponents/Loading";
import {
  Flex,
  Box,
  Heading,
  TabList,
  Tab,
  Tabs,
  TabPanels,
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

  function tabOnClickHandler(tabIndex: number, post: Post) {
    const { latitude, longitude } = post;
    reverseGeoCode(latitude, longitude);
    set_postIndex(tabIndex);
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
      const momentEndTripDate = moment(oneTrip.endDate);
      if (momentCurrentDate > momentEndTripDate) return true;
    }
    return false;
  };
  const validation = oneTrip && user.token && !isTripOver() && isUser;
  console.log("validation", isUser);
  const menu = validation ? <PostMenu oneTrip={oneTrip} /> : null;

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
