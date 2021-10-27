import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailTodo = (props) => {
  const title = props.route.params.title;
  const description = props.route.params.description;
  const status = props.route.params.status;
  const id = props.route.params.id;

  return (
    <View style={style.container}>
      <Text h1 style={{ fontWeight: "bold" }}>
        {title} - {status}
      </Text>
      <Text h2 style={{ fontWeight: "bold" }}>
        {description}
      </Text>
    </View>
  );
};

export default DetailTodo;

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 16,
    flex: 1,
  },
});
