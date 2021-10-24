import React from "react";
import { Box, Text } from "native-base";

export default function Display(props) {
  const { value } = props;

  return (
    <Box bg="primary.50" borderRadius={5} height={100} mb={5}>
      <Text
        fontSize={45}
        mx={3}
        my={2}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      >
        {value ?? 0}
      </Text>
    </Box>
  );
}
