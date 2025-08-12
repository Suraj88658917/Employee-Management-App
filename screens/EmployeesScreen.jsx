import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const EmployeesScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/employees"); // Replace with your IP
        setEmployees(response.data);
      } catch (error) {
        console.log("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.employeeName.toLowerCase().includes(input.toLowerCase())
  );

  const renderEmployee = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("UserScreen", {
          id: item.employeeId,
          name: item.employeeName,
          designation: item.designation,
          salary: item.salary,
        })
      }
      style={styles.employeeItem}
    >
      <Text style={styles.employeeName}>{item.employeeName}</Text>
      <Text style={styles.employeeSub}>
        {item.designation} • ID: {item.employeeId}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={20} color="black" />
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="gray"
          />
          <Pressable onPress={() => navigation.navigate("AddDetails")}>
            <AntDesign name="pluscircle" size={28} color="#0072b1" />
          </Pressable>
        </View>
      </View>

      {/* List or Empty */}
      {filteredEmployees.length > 0 ? (
        <FlatList
          data={filteredEmployees}
          keyExtractor={(item) => item._id}
          renderItem={renderEmployee}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No Employees Found</Text>
          <Text>Add an employee using the + button</Text>
          <Pressable onPress={() => navigation.navigate("AddDetails")}>
            <AntDesign
              style={{ marginTop: 20 }}
              name="pluscircle"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default EmployeesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#f8f8f8",
  },
  searchContainer: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    fontSize: 16,
    color: "black",
  },
  employeeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "600",
  },
  employeeSub: {
    color: "gray",
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
