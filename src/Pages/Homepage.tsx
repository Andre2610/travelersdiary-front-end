import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config/constants";
import { Trip } from "../model";
import TripCard from "../Components/TripCard";
import { Flex, Text, Box, Heading, Button } from "@chakra-ui/core";

export default function Homepage() {
  const [trips, set_trips] = useState<Trip[]>([]);

  async function fetchTrips() {
    try {
      const res = await axios.get(`${apiUrl}/trips`);
      console.log("What is my response", res.data);
      set_trips(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <Box w="100vw" m="auto" bg="orange.200" p="2vh">
      {trips.map((trip) => {
        return (
          <Box key={trip.id}>
            <TripCard
              id={trip.id}
              tripTitle={trip.tripTitle}
              posts={trip.posts}
              startDate={trip.startDate}
              endDate={trip.endDate}
            />
          </Box>
        );
      })}
    </Box>
  );
}
