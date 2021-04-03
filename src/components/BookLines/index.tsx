import React, { useState } from "react";
import { LinesWrapper, Line } from "./styles";

const BookLines: React.FC = () => {
  const [numberOfLinesToRender, setNumberOfLinesToRender] = useState(0);
  const lineHeight = 40;

  return (
    <LinesWrapper
      pointerEvents="none"
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setNumberOfLinesToRender(Math.floor(height / lineHeight));
      }}
    >
      {[...Array(numberOfLinesToRender)].map((e, i) => (
        <Line key={i.toString()} height={lineHeight} />
      ))}
    </LinesWrapper>
  );
};

export default BookLines;
