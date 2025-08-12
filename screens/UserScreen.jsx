import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "axios";

const UserScreen = ({ route }) => {
  const { id, name, designation, salary } = route.params;

  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => date.format("MMMM D, YYYY");

  const submitAttendance = async () => {
    try {
      const attendanceData = {
        employeeId: id,
        employeeName: name,
        date: formatDate(currentDate),
        status: attendanceStatus,
      };

      const response = await axios.post(
        "http://10.0.2.2:8000/attendance", // Replace with your machine IP, not localhost
        attendanceData
      );

      if (response.status === 200) {
        Alert.alert(` Attendance submitted for ${name}`);
      }
    } catch (error) {
      console.log("Error submitting attendance:", error.message);
      Alert.alert(" Failed to submit attendance");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* DATE NAVIGATION */}
      <View style={styles.dateNav}>
        <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
      </View>

      {/* EMPLOYEE INFO */}
      <Pressable style={styles.profileRow}>
        <View style={styles.profileCircle}>
          <Text style={{ color: "white", fontSize: 16 }}>
            {name?.charAt(0)}
          </Text>
        </View>
        <View>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.metaText}>
            {designation} ({id})
          </Text>
        </View>
      </Pressable>

      {/* PAY */}
      <Text style={styles.basicPay}>Basic Pay: ₹{salary}</Text>

      {/* ATTENDANCE OPTIONS */}
      <View style={{ marginHorizontal: 12 }}>
        <Text style={styles.attendanceLabel}>ATTENDANCE</Text>

        <View style={styles.statusRow}>
          {["present", "absent"].map((type) => (
            <Pressable
              key={type}
              onPress={() => setAttendanceStatus(type)}
              style={styles.statusButton}
            >
              {attendanceStatus === type ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.statusRow}>
          {["halfday", "holiday"].map((type) => (
            <Pressable
              key={type}
              onPress={() => setAttendanceStatus(type)}
              style={styles.statusButton}
            >
              {attendanceStatus === type ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>{type === "halfday" ? "Half Day" : "Holiday"}</Text>
            </Pressable>
          ))}
        </View>

        {/* BONUS & LOAN */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Advance / Loans"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Extra Bonus"
            placeholderTextColor="black"
          />
        </View>

        {/* SUBMIT BUTTON */}
        <Pressable onPress={submitAttendance} style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Attendance</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  dateNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
  },
  profileRow: {
    marginVertical: 10,
    marginHorizontal: 12,
    flexDirection: "row",
    gap: 10,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  metaText: {
    marginTop: 5,
    color: "gray",
  },
  basicPay: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 12,
  },
  attendanceLabel: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 3,
    marginTop: 7,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 10,
  },
  statusButton: {
    backgroundColor: "#C4E0E5",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    borderRadius: 6,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    padding: 10,
    flex: 1,
  },
  submitBtn: {
    padding: 15,
    backgroundColor: "#00c6ff",
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 6,
  },
  submitText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
});
