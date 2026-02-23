import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const options = {
  headerShown: false,
};

export default function PatientDashboard() {
  const router = useRouter();

  const Card = ({ title, icon, onPress }: any) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={40}
        color="#7B4BB7"
      />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome 👋</Text>
        <Text style={styles.subText}>
          Stay consistent. Stay healthy 💜
        </Text>
      </View>

      <View style={styles.grid}>
        <Card
          title="Schedule Medicine"
          icon="pill"
          onPress={() => router.push("/medicine")}
        />

        <Card
          title="Scan Prescription"
          icon="camera-document"
          onPress={() => {}}
        />

        <Card
          title="Habit Tracker"
          icon="checkbox-marked-circle-outline"
          onPress={() => {}}
        />

        <Card
          title="Doctor Connect"
          icon="stethoscope"
          onPress={() => {}}
        />

        <Card
          title="Water Intake"
          icon="cup-water"
          onPress={() => {}}
        />

        <Card
          title="Mood Tracker"
          icon="emoticon-outline"
          onPress={() => {}}
        />

        <Card
          title="Taken Medicines"
          icon="clipboard-check-outline"
          onPress={() => {}}
        />

        <Card
          title="Reports"
          icon="file-chart-outline"
          onPress={() => {}}
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
    marginBottom: 25,
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
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },

  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#7B4BB7",
    textAlign: "center",
  },
});