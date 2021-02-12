import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import RoundButton from "components/RoundButton";
import { Wrapper, Container } from "./styles";

interface ToolBoxProps {
  onPressAlignLeft: () => void;
  onChange: (value: string) => void;
}

const data = [
  {
    id: "justifyLeft",
    name: "format-align-left",
  },
  {
    id: "justifyCenter",
    name: "format-align-justify",
  },
  {
    id: "justifyRight",
    name: "format-align-right",
  },
  {
    id: "bold",
    name: "format-bold",
  },
  {
    id: "italic",
    name: "format-italic",
  },
  {
    id: "underline",
    name: "format-underline",
  },
];

const ToolBox: React.FC<ToolBoxProps> = ({ onChange }) => {
  const [isSelected, setSelected] = useState(0);
  const theme = useTheme();
  return (
    <Container>
      <Wrapper>
        {data.map((item, index) => {
          return (
            <RoundButton
              key={index.toString()}
              onPress={() => {
                onChange(item.name);
                setSelected(index);
              }}
              size="large"
              backgroundColor={
                isSelected === index
                  ? theme.toolBox.button.active.backgroundColor
                  : theme.toolBox.button.default.backgroundColor
              }
              underlayColor={
                isSelected === index
                  ? theme.toolBox.button.active.underlayColor
                  : theme.toolBox.button.default.underlayColor
              }
            >
              <MaterialIcons
                name={item.name}
                size={24}
                color={
                  isSelected === index
                    ? theme.toolBox.button.active.iconColor
                    : theme.toolBox.button.default.iconColor
                }
              />
            </RoundButton>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default ToolBox;
