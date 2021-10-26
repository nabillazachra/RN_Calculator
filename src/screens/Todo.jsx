import { StatusBar } from "expo-status-bar";
import { Box, Text } from "native-base";
import React from "react";
import Layout from "../components/Layout";
import ListTodo from "../components/ListTodo";

export default function Todo() {
  return (
    <Layout>
      <StatusBar />
      <Box mt={5} mx={5} flex={1}>
        <Text color="primary.700" fontWeight="bold" fontSize={40}>
          YOUR TODO APP
        </Text>
        <ListTodo />
      </Box>
    </Layout>
  );
}
