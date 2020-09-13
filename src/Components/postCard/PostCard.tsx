import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Store/users/selector";
import { Post } from "../../Types/tripTypes";
import { Flex, Heading, Box, Text } from "@chakra-ui/core";
import Slider from "../slider";
import PostOwnerOptions from "../../Components/postOptions/PostOwnerOptions";
import PostVisitorOptions from "../../Components/postOptions/PostVisitorOptions";

export default function PostCard(props: { post: Post; isUser: boolean }) {
  const { title, content, pictures } = props.post;
  const paragraphs = content ? content.split("\n") : [];
  const user = useSelector(selectUser);
  const postOptions = props.isUser ? (
    <PostOwnerOptions post={props.post} />
  ) : user.token ? (
    <PostVisitorOptions />
  ) : null;

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
        {postOptions}
      </Flex>
    );
  }
  return (
    <>
      <Heading as="h3" size="sm" w="95%" m="auto" my={2}>
        {title}
      </Heading>
      {paragraphs.map((paragraph, i) => (
        <Text key={i} marginX="auto" w="95%" marginY="0.5rem">
          {paragraph}
        </Text>
      ))}
    </>
  );
}
