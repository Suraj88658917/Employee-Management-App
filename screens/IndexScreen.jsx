import { StyleSheet, Text, View, ScrollView, Pressable , Image } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient"; // For CLI (not Expo)
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import LogoutScreen from "./LogoutScreen";

const IndexScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <LinearGradient colors={["#4444ebff", "#fdfdfdff"]} style={{ flex: 1 }}>
        <View style={{ padding: 12 }}>
          {/* HEADER */}
          <View style={styles.header}>
            <Feather name="bar-chart" size={24} color="black" />
            <Text style={styles.headerTitle}>Employee Management System</Text>
            <Entypo name="lock" size={24} color="black" />
          </View>

          {/* TILE BUTTONS */}
        <View style={styles.tileRow}>
      <Pressable onPress={() => navigation.navigate("Employees")} style={styles.tile}>
        <View style={styles.iconCircle}>
          <Image
            source={require("../assets/images/favicon.png")}
            style={styles.iconImage}
          />
        </View>
        <Text style={styles.tileLabel}>Employee List</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("MarkAttendance")} style={styles.tile}>
        <View style={styles.iconCircle}>
          <Image
            source={require("../assets/images/favicon.png")}
            style={styles.iconImage}
          />
        </View>
        <Text style={styles.tileLabel}>Mark Attendance</Text>
      </Pressable>
    </View>
          {/* REPORTS */}
          <View style={styles.panel}>
            <PanelItem label="Attendance Report" icon={<Ionicons name="newspaper-outline" size={24} color="black" />} />
            <PanelItem label="Summary Report" icon={<Octicons name="repo-pull" size={24} color="black" />} onPress={() => navigation.navigate("Summary")} />
            <PanelItem label="All Generate Reports" icon={<Octicons name="report" size={24} color="black" />} />
            <PanelItem label="Overtime Employees" icon={<Ionicons name="people" size={24} color="black" />} />
          </View>

          {/* INFO ROWS */}
          <View style={styles.infoRow}>
            <InfoBox bg="#f79d00" icon={<MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />} label="Attendance Criteria" />
            <InfoBox bg="#ABCABA" icon={<Feather name="bar-chart" size={24} color="black" />} label="Increased Workflow" />
          </View>
          <View style={styles.infoRow}>
            <InfoBox bg="#D3CCE3" icon={<MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />} label="Cost Savings" />
            <InfoBox bg="#bdc3c7" icon={<Feather name="bar-chart" size={24} color="black" />} label="Employee Performance" />
          </View>
        </View>
      </LinearGradient>
      <LogoutScreen/>
    </ScrollView>
    
  );
};

// Subcomponents
const PanelItem = ({ label, icon, onPress }) => (
  <Pressable style={styles.panelItem} onPress={onPress}>
    <View style={styles.panelIcon}>{icon}</View>
    <Text style={styles.panelText}>{label}</Text>
    <View style={styles.panelArrow}>
      <Entypo name="chevron-right" size={24} color="black" />
    </View>
  </Pressable>
);

const InfoBox = ({ bg, icon, label }) => (
  <View style={[styles.infoBox, { backgroundColor: bg }]}>
    <View style={styles.iconSmall}>{icon}</View>
    <Text style={styles.infoText}>{label}</Text>
  </View>
);

export default IndexScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  
  tileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tile: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  tileLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  panel: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 7,
  },
  panelItem: {
    backgroundColor: "#34aee7ff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
  },
  panelIcon: {
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  panelText: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
  },
  panelArrow: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },
  infoBox: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSmall: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    marginTop: 7,
  },
});
