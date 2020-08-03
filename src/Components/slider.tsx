import React from "react";
import "../Style/GenStyle.css";
import {
  Image,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/core";
import { Picture } from "../Types/model";

export default function Slider(props: { pictures: Picture[] }) {
  return (
    <Tabs defaultIndex={0} align="center" variantColor="whiteAlpha" pb={4}>
      <TabPanels>
        {props.pictures.map((picture, i) => {
          return (
            <TabPanel key={i}>
              <Image
                src={picture.imageUrl}
                w="100%"
                minH="35vh"
                maxH="35vh"
                objectFit="fill"
                fallbackSrc="https://via.placeholder.com/150"
              />
            </TabPanel>
          );
        })}
      </TabPanels>
      {props.pictures.length > 1 ? (
        <TabList>
          {props.pictures.map((picture, i) => {
            return (
              <Tab color="white.500" className="navbtn" key={i}>
                {i + 1}
              </Tab>
            );
            // return <Tab>⦿</Tab>;
          })}
        </TabList>
      ) : null}
    </Tabs>
  );
}
