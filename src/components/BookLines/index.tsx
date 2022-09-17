import React, { useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { LinesWrapper, Line } from "./styles";

const BookLines: React.FC = () => {
  const [numberOfLinesToRender, setNumberOfLinesToRender] = useState(0);
  const lineHeight = 40;

  return (
    <LinesWrapper
      pointerEvents="none"
      onLayout={(e: LayoutChangeEvent) => {
        const { height } = e.nativeEvent.layout;
        setNumberOfLinesToRender(Math.floor(height / lineHeight));
      }}
    >
      {[...Array(numberOfLinesToRender)].map((e, i) => (
        <Line key={`book-line-${i}`} height={lineHeight} />
      ))}
    </LinesWrapper>
  );
};

export default BookLines;
