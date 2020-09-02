import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import TripCard from "../Components/tripCard/TripCard";
import Loading from "../Components/AppStateComponents/Loading";
import { Trip, Post } from "../Types/tripTypes";
import { Box } from "@chakra-ui/core";
import { fetchTrips } from "../Store/trips/actions";
import { selectAllTrips } from "../Store/trips/selector";
import { selectAppLoading } from "../Store/appState/selector";

export default function Homepage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAppLoading);
  const history = useHistory();
  const allTrips: Trip[] = useSelector(selectAllTrips);

  useEffect(() => {
    dispatch(fetchTrips());
    history.push("/");
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Box>
        <Box></Box>
        <Box w="100vw" m="auto" bg="blackAlpha.300" p="2vh" top="1" mt="3rem">
          {allTrips
            .sort((a: Trip, b: Trip) => b.id - a.id)
            .map((trip) => {
              const sortedPosts = trip.posts.sort((a: Post, b: Post) => {
                return b.id - a.id;
              });
              const post = [{ ...sortedPosts[0] }];
              return (
                <Box
                  key={trip.id}
                  rounded="lg"
                  w="80%"
                  m="auto"
                  p="15px"
                  my="3vh"
                  border="2px solid gray"
                  overflow="hidden"
                  className="tripCardContainer"
                >
                  <TripCard
                    id={trip.id}
                    tripTitle={trip.tripTitle}
                    posts={post}
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                    userId={trip.userId}
                  />
                </Box>
              );
            })}
        </Box>
      </Box>
    );
  }
}
