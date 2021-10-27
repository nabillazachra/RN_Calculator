import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { List, Box, Text, HStack, Flex, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";
import AddTodo from "../screens/AddTodo";

export default function ListTodo() {
  const navigation = useNavigation();
  const url = "http://192.168.1.11:4000/api/v1/";
  const [todo, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    setIsLoading(true);
    axios
      .get(`${url}/todos`)
      .then((res) => {
        setTodos(res.data.data.todos);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error Fetch Data");
        setIsLoading(false);
      });
  };

  const handleDone = async (id) => {
    try {
      let done = {
        status: "Done",
      };

      const response = await axios.patch(`${url}/todo/${id}`, done);
      setIsLoading(true);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotDone = async (id) => {
    try {
      let notDone = {
        status: "Not done",
      };

      const response = await axios.patch(`${url}/todo/${id}`, notDone);
      setIsLoading(true);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${url}/todo/${id}`);
      setIsLoading(true);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const _renderItem = ({ item }) => {
    return (
      <List
        key={item.id.toString()}
        my={2}
        spacing={2}
        bg={item.status === "Done" ? "primary.50" : "primary.200"}
        borderRadius={10}
      >
        <List.Item onPress={() => navigation.navigate("DetailTodo", item)}>
          <HStack direction="row" space={10}>
            {item.status === "Done" ? (
              <HStack>
                <MaterialCommunityIcons
                  onPress={() => handleNotDone(item.id)}
                  name="close-box-outline"
                  size={24}
                  color="navy"
                />
                <MaterialIcons
                  onPress={() => deleteTodo(item.id)}
                  name="delete-forever"
                  size={24}
                  color="red"
                />
              </HStack>
            ) : (
              <HStack align="rigth">
                <FontAwesome
                  onPress={() => handleDone(item.id)}
                  name="check-square-o"
                  size={24}
                  color="green"
                />
              </HStack>
            )}
            <Text>{item.title}</Text>
          </HStack>
        </List.Item>
      </List>
    );
  };

  return (
    <Box mt={5} mx={5} flex={1}>
      <Text color="primary.500" mb={2} fontWeight="bold">
        LIST TODO
      </Text>
      <AddTodo getTodos={getTodos} />
      <FlatList
        data={todo}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={getTodos}
      />
    </Box>
  );
}
