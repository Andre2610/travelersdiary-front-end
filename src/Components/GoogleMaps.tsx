import React, { useRef, useState } from "react";
import { Post, DefaultMarker } from "../Types/model";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { googleAPIkey } from "../config/constants";

const MyMapComponent = withScriptjs(
  withGoogleMap((props: { posts: Post[]; moveToMarker: DefaultMarker }) => {
    const { lat, lng, address, flag } = props.moveToMarker;
    const center = { lat: lat, lng: lng };
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectPost, set_selectPost] = useState<Post>({
      id: 0,
      latitude: 0,
      longitude: 0,
      title: "",
      content: "",
      pictures: [],
      tripId: 0,
    });
    const refMap = useRef(null);

    const markerClickHandler = (event: any, post: Post) => {
      // Remember which place was clicked
      set_selectPost(post);

      // Required so clicking a 2nd marker works as expected
      if (infoOpen) {
        setInfoOpen(false);
      }
      setInfoOpen(true);
    };

    return (
      <GoogleMap
        ref={refMap}
        defaultZoom={8}
        center={
          center.lat && center.lng
            ? center
            : { lat: props.posts[0].latitude, lng: props.posts[0].longitude }
        }
      >
        {props.posts.map((post) => {
          const { latitude, longitude } = post;
          return (
            <Marker
              key={post.id}
              position={{ lat: latitude, lng: longitude }}
              title={post.title}
              animation={google.maps.Animation.DROP}
              onClick={(event) => markerClickHandler(event, post)}
            ></Marker>
          );
        })}

        {/* {infoOpen && selectPost && (
          <InfoWindow
            // @ts-ignore
            position={{
              lat: selectPost.latitude * 1,
              lng: selectPost.longitude * 1,
            }}
            // onCloseClick={() => setInfoOpen(false)}
          >
            <Text>RIGHT!</Text>
          </InfoWindow>
        )} */}
      </GoogleMap>
    );
  })
);

export default (props: { posts: Post[]; moveToMarker: DefaultMarker }) => {
  return (
    <MyMapComponent
      //@ts-ignore
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleAPIkey}`}
      //@ts-ignore
      loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
      //@ts-ignore
      containerElement={
        <div
          style={{
            height: `100%`,
            width: `100%`,
            alignSelf: "center",
            justifySelf: "center",
          }}
        />
      }
      //@ts-ignore
      mapElement={<div style={{ height: `50vh`, width: `63vw` }} />}
      //@ts-ignore
      posts={props.posts}
      moveToMarker={props.moveToMarker}
    />
  );
};
