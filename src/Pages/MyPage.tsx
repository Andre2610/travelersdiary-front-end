import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/users/selector";
import { selectAppLoading } from "../Store/appState/selector";
import { Trip } from "../Types/model";
import TripCard from "../Components/TripCard";
import NewTripModal from "../Components/NewTripModal";
import Loading from "../Components/AppStateComponents/Loading";
import "../Style/GenStyle.scss";
import { Flex, Text, Box, Heading } from "@chakra-ui/core";

export default function MyPage() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const loading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!user.token) {
      history.push("/");
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  } else {
    if (!user.id) return null;

    //@ts-ignore
    const about = user.about
      .split("\n")
      .map((paragraph, i) => <Text key={i}>{paragraph}</Text>);

    return (
      <Box w="100vw" m="auto" bg="blackAlpha.300" p="2vh" top="1" mt="3rem">
        <Flex flexDirection="column" justify="center" w="80vw" m="auto">
          <Box
            w="100%"
            my="3rem"
            maxH="60vh"
            minH="25vh "
            h="auto"
            position="relative"
          >
            <Heading as="h2" p="1rem" textAlign="center">
              {user.title}
            </Heading>
            <Box mx="3rem" mb="0.5rem">
              <Heading margin="auto" fontSize="1.5rem">
                {user.firstName} {user.lastName}
              </Heading>
            </Box>
            <Box mx="2rem" pb="2rem" h="auto">
              {about}
            </Box>
            {/* <Button
            onClick={() => set_edit(!edit)}
            my="1rem"
            position="absolute"
            bottom="0rem"
            right="1rem"
          >
            Edit
          </Button> */}
          </Box>
          <Flex justify="center">
            <NewTripModal />
          </Flex>

          {user.trips
            .sort((a: Trip, b: Trip) => a.id - b.id)
            .map((trip) => {
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
                >
                  <TripCard
                    id={trip.id}
                    tripTitle={trip.tripTitle}
                    posts={trip.posts}
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                    userId={trip.userId}
                  />
                </Box>
              );
            })}
        </Flex>
      </Box>
    );
  }
}
