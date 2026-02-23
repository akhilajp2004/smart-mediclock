import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

export const options = {
  headerShown: false,
};

export default function CaregiverDashboard() {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    const user = auth.currentUser;
    if (!user) return;

    const caregiverDoc = await getDoc(doc(db, "users", user.uid));
    const linkedPatientId = caregiverDoc.data()?.linkedPatientId;

    if (!linkedPatientId) {
      setMedicines([]);
      return;
    }

    const q = query(
      collection(db, "medicines"),
      where("patientId", "==", linkedPatientId)
    );

    const snapshot = await getDocs(q);

    const list: any[] = [];
    snapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });

    setMedicines(list);
  }

  const IconCard = ({ title, icon, onPress }: any) => (
    <TouchableOpacity style={styles.iconCard} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={32} color="#7B4BB7" />
      <Text style={styles.iconText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* Welcome */}
      <Text style={styles.title}>Welcome Caregiver 👋</Text>

      {/* Icons Row */}
      <View style={styles.iconRow}>
        <IconCard
          title="Medicines List"
          icon="clipboard-check-outline"
          onPress={() => setShowList(true)}
        />

        <IconCard
          title="Patient Summary"
          icon="file-document-outline"
          onPress={() => {}}
        />

        <IconCard
          title="Daily Report"
          icon="file-chart-outline"
          onPress={() => {}}
        />
      </View>

      {/* Show Medicines List Only When Pressed */}
      {showList && (
        <FlatList
          data={medicines}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No medicines found
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7B4BB7",
    marginTop: 40,
    marginBottom: 20,
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  iconCard: {
    width: "30%",
    backgroundColor: "#F4ECFB",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },

  iconText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    color: "#7B4BB7",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#F4ECFB",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7B4BB7",
  },

  time: {
    fontSize: 14,
    color: "#333",
  },
});