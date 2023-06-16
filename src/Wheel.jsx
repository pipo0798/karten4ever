import React from "react";
import WheelComponent from "react-wheel-of-prizes";

function Gönnerator() {
  const segments = ["1", "7", "3", "6", "8", "2", "5", "4"];
  const segColors = [
    "white",
    "#60BA97",
    "orange",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
  ];
  const onFinished = (winner) => {
    console.log(winner);
  };
  return (
    <div className="App">
      <div>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment="MM"
          onFinished={(winner) => onFinished(winner)}
          primaryColor="white"
          contrastColor="black"
          buttonText="Start"
          isOnlyOnce={false}
          size={150}
          upDuration={0}
          downDuration={800}
          fontFamily="Helvetica"
          segClassName="custom-segment"
        />
      </div>
    </div>
  );
}

export default Gönnerator;
