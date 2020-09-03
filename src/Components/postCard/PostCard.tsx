import React from "react";
import { Post } from "../../Types/tripTypes";
import { Flex, Heading, Box, Text } from "@chakra-ui/core";
import Slider from "../slider";

export default function PostCard(props: { post: Post }) {
  const { title, content, pictures } = props.post;
  const paragraphs = content ? content.split("\n") : [];

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
