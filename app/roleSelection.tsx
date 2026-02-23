import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebaseConfig";

export const options = {
  headerShown: false,
};

export default function RoleSelection() {
  const router = useRouter();
  const user = auth.currentUser;

  const selectRole = async (role: string) => {
    if (!user) return;

    try {
      if (role === "caregiver") {
        const linkedPatientUID = "ZDwWv9oNK7d7KjRdj3kdLcK73Tw2";

        await setDoc(
          doc(db, "users", user.uid),
          {
            role: "caregiver",
            linkedPatientId: linkedPatientUID,
          },
          { merge: true }
        );

        router.push("/caregiverDashboard");
        return;
      }

      if (role === "patient") {
        await setDoc(
          doc(db, "users", user.uid),
          { role: "patient" },
          { merge: true }
        );

        router.push("/patientDetails");
        return;
      }

      if (role === "doctor") {
        await setDoc(
          doc(db, "users", user.uid),
          { role: "doctor" },
          { merge: true }
        );

        router.push("/doctorDashboard");
        return;
      }
    } catch (error) {
      alert("Error saving role");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      {/* Patient */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => selectRole("patient")}
      >
        <Ionicons name="person" size={48} color="#6A1B9A" />
        <Text style={styles.cardText}>Patient</Text>
      </TouchableOpacity>

      {/* Doctor */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => selectRole("doctor")}
      >
        <FontAwesome5 name="user-md" size={44} color="#6A1B9A" />
        <Text style={styles.cardText}>Doctor</Text>
      </TouchableOpacity>

      {/* Caregiver */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => selectRole("caregiver")}
      >
        <FontAwesome5 name="users" size={44} color="#6A1B9A" />
        <Text style={styles.cardText}>Caregiver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7B4BB7",
    textAlign: "center",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#EDE1F7",
    paddingVertical: 35,
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 25,

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  cardText: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
    color: "#6A1B9A",
  },
});