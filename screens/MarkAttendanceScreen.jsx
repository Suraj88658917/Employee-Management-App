import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const MarkAttendanceScreen = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextDay = () => setCurrentDate((prev) => moment(prev).add(1, "days"));
  const goToPrevDay = () => setCurrentDate((prev) => moment(prev).subtract(1, "days"));
  const formatDate = (date) => date.format("MMMM D, YYYY");

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://192.168.1.8:8000/employees"); // use your IP
        setEmployees(response.data);
      } catch (error) {
        console.log("Error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get("http://192.168.1.8:8000/attendance", {
          params: {
            date: formatDate(currentDate),
          },
        });
        setAttendance(response.data);
      } catch (error) {
        console.log("Error fetching attendance data", error);
      }
    };
    fetchAttendanceData();
  }, [currentDate]);

  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );
    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "", // default: not marked
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
        }}
      >
        <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
      </View>

      <View style={{ marginHorizontal: 12 }}>
        {employeeWithAttendance.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate("UserScreen", {
                id: item.employeeId,
                name: item.employeeName,
                designation: item.designation,
                salary: item.salary,
              })
            }
            style={styles.employeeCard}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item?.employeeName?.charAt(0)}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.employeeName}>{item?.employeeName}</Text>
              <Text style={styles.employeeInfo}>
                {item?.designation} ({item?.employeeId})
              </Text>
            </View>

            {item?.status && (
              <View style={styles.statusCircle}>
                <Text style={styles.statusText}>
                  {item.status.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MarkAttendanceScreen;

const styles = StyleSheet.create({
  employeeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  employeeInfo: {
    marginTop: 5,
    color: "gray",
  },
  statusCircle: {
    width: 50,
    height: 50,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FF69B4",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
