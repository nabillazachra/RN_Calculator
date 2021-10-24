import React, { useState } from "react";
import { Box, Text } from "native-base";

import { StatusBar } from "expo-status-bar";
import Buttons from "../components/Buttons";
import Display from "../components/Display";
import Layout from "../components/Layout";

export default function Container() {
  const [result, setResult] = useState(null);

  const onResult = (result) => {
    setResult(result);
  };

  return (
    <Layout>
      <StatusBar />
      <Box mt={5} mx={5} flex={1}>
        <Text color="primary.700" fontWeight="bold" fontSize={40}>
          CALCULATOR
        </Text>
        <Display value={result} />
        <Buttons onResult={onResult} />
      </Box>
    </Layout>
  );
}
