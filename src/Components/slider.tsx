import React from "react";
import "../Style/GenStyle.scss";
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
// const [x, set_x] = useState(0);

// const goLeft = () => {
//   console.log(x);
//   x === 0 ? set_x(-100 * (props.pictures.length - 1)) : set_x(x + 100);
// };
// const goRight = () => {
//   x === -100 * (props.pictures.length - 1) ? set_x(0) : set_x(x - 100);
// };

//     <div className="slider">
//       {props.pictures.map((picture) => {
//         return (
//           <div
//             key={picture.id}
//             className="slide"
//             style={{ transform: `translateX(${x}%)` }}
//           >
//             <img src={picture.imageUrl} key={picture.id} alt="" />
//           </div>
//         );
//       })}
//       <button id="goLeft" onClick={goLeft}>
//         {/* <img src={leftarrow} className="arrow" /> */}
//       </button>
//       <button id="goRight" onClick={goRight}>
//         {/* <img src={rightarrow} className="arrow" /> */}
//       </button>
//     </div>
