import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const options = {
  headerShown: false,
};

export default function DoctorDashboard() {

  const Card = ({ title, icon }: any) => (
    <TouchableOpacity style={styles.card}>
      <MaterialCommunityIcons
        name={icon}
        size={42}
        color="#7B4BB7"
      />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Doctor 👋</Text>
        <Text style={styles.subText}>
          Manage prescriptions and monitor patients
        </Text>
      </View>

      <View style={styles.grid}>
        
        <Card
          title="Schedule Prescription"
          icon="file-document-edit-outline"
        />

        <Card
          title="Patient Report"
          icon="file-chart-outline"
        />

        <Card
          title="Overview"
          icon="chart-line"
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  welcomeContainer: {
    marginTop: 40,
    marginBottom: 30,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7B4BB7",
  },

  subText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    backgroundColor: "#F4ECFB",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },

  cardText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#7B4BB7",
    textAlign: "center",
  },
});