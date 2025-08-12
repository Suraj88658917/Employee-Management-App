import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DataTable } from "react-native-paper";

const SummaryScreen = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  const fetchAttendanceReport = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/attendance-report-all-employees`,
        {
          params: {
            month: currentDate.month() + 1, // moment months are 0-indexed
            year: currentDate.year(),
          },
        }
      );
      setAttendanceData(response.data.report);
    } catch (error) {
      console.log("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceReport();
  }, [currentDate]); // re-fetch when month changes

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Month Navigator */}
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
        <AntDesign
          onPress={goToPrevMonth}
          name="left"
          size={24}
          color="black"
        />
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {formatDate(currentDate)}
        </Text>
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={24}
          color="black"
        />
      </View>

      {/* Attendance Report */}
      <View style={{ marginHorizontal: 12 }}>
        {attendanceData?.map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            {/* Employee Header */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#4b6cb7",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                  {item?.name?.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </View>

            {/* Data Table */}
            <View
              style={{
                marginTop: 15,
                margin: 5,
                padding: 5,
                backgroundColor: "#A1FFCE",
                borderRadius: 5,
              }}
            >
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>P</DataTable.Title>
                  <DataTable.Title>A</DataTable.Title>
                  <DataTable.Title>HD</DataTable.Title>
                  <DataTable.Title>H</DataTable.Title>
                  <DataTable.Title>NW</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{item?.present ?? 0}</DataTable.Cell>
                  <DataTable.Cell>{item?.absent ?? 0}</DataTable.Cell>
                  <DataTable.Cell>{item?.halfday ?? 0}</DataTable.Cell>
                  <DataTable.Cell>{item?.holiday ?? 0}</DataTable.Cell>
                  <DataTable.Cell>{item?.nonWorking ?? 0}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({});
