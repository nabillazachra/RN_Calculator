import { SimpleGrid, Box, Center, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";

const data = [
  { value: "1", color: "red", type: "number" },
  { value: "2", color: "red", type: "number" },
  { value: "-", color: "orange", type: "operator", operation: "-" },
  { value: "+", color: "orange", type: "operator", operation: "+" },
  { value: "3", color: "red", type: "number" },
  { value: "4", color: "red", type: "number" },
  { value: "/", color: "orange", type: "operator", operation: "/" },
  { value: "x", color: "orange", type: "operator", operation: "*" },
  { value: "5", color: "red", type: "number" },
  { value: "6", color: "red", type: "number" },
  { value: "%", color: "orange", type: "operator", operation: "%" },
  { value: "=", color: "orange", type: "operator", operation: "=" },
  { value: "7", color: "red", type: "number" },
  { value: "8", color: "red", type: "number" },
  { value: "9", color: "red", type: "number" },
  { value: "0", color: "red", type: "number" },
];

export default function Buttons({ onResult }) {
  const [stringNumber, setStringNumber] = useState("");
  const [stringNumberNext, setStringNumberNext] = useState("");
  const [operand, setOperand] = useState("");

  useEffect(() => {
    onResult(`${stringNumber} ${operand} ${stringNumberNext}`);
  }, [stringNumber, operand, stringNumberNext]);

  const reset = (resultTmp) => {
    setStringNumber(resultTmp);
    setOperand("");
    setStringNumberNext("");
  };

  const onPress = (item) => {
    switch (item.type) {
      case "number":
        if (operand) setStringNumberNext(stringNumberNext + item.value);
        else setStringNumber(stringNumber + item.value);
        // code block
        break;
      default:
        if (!stringNumber) return false;
        if (
          stringNumberNext &&
          stringNumber &&
          item.operation == "=" &&
          operand
        ) {
          let resultTmp = 0;
          let stringNumberTmp = parseFloat(stringNumber);
          let stringNumberTmpNext = parseFloat(stringNumberNext);
          switch (operand) {
            case "-":
              resultTmp = stringNumberTmp - stringNumberTmpNext;
              break;
            case "/":
              resultTmp = stringNumberTmp / stringNumberTmpNext;
              break;
            case "+":
              resultTmp = stringNumberTmp + stringNumberTmpNext;
              break;
            case "*":
              resultTmp = stringNumberTmp * stringNumberTmpNext;
              break;
            case "%":
              resultTmp = stringNumberTmp % stringNumberTmpNext;
              break;
          }
          reset(resultTmp);
        } else if (item.operation != "=") {
          setOperand(item.operation);
        }
      // code block
    }
  };

  return (
    <>
      <SimpleGrid columns={4} spacing={2}>
        {data.map((item, index) => {
          return (
            <Pressable key={index} onPress={() => onPress(item)}>
              <Box
                ml="1"
                mb="1"
                key={index}
                bg={`${item.color}.400`}
                size={85}
                rounded="lg"
              >
                <Center my="auto">
                  <Text color="primary.50" fontWeight="bold" fontSize={40}>
                    {item.value}
                  </Text>
                </Center>
              </Box>
            </Pressable>
          );
        })}
      </SimpleGrid>
    </>
  );
}
