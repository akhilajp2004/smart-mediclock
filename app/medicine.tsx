import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";

/* 🔥 ADDED FIRESTORE IMPORTS */
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const options = {
  headerShown: false,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MedicineScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [medicines, setMedicines] = useState<any[]>([]);

  useEffect(() => {
    setupNotifications();
    loadMedicines();
  }, []);

  async function setupNotifications() {
    await Notifications.requestPermissionsAsync();

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      });
    }
  }

  async function loadMedicines() {
    const user = auth.currentUser;
    if (!user) return;

    const saved = await AsyncStorage.getItem(`medicines_${user.uid}`);
    if (saved) setMedicines(JSON.parse(saved));
    else setMedicines([]);
  }

  async function saveToStorage(data: any[]) {
    const user = auth.currentUser;
    if (!user) return;

    await AsyncStorage.setItem(
      `medicines_${user.uid}`,
      JSON.stringify(data)
    );
  }

  async function saveMedicine() {
    if (!name || !time) {
      alert("Enter medicine name and time");
      return;
    }

    try {
      let input = time.trim().toUpperCase();

      let hour: number;
      let minute: number;

      if (input.includes("AM") || input.includes("PM")) {
        const parts = input.split(" ");
        if (parts.length !== 2) throw new Error();

        const timePart = parts[0];
        const modifier = parts[1];

        const hm = timePart.split(":");
        if (hm.length !== 2) throw new Error();

        hour = parseInt(hm[0]);
        minute = parseInt(hm[1]);

        if (modifier === "PM" && hour < 12) hour += 12;
        if (modifier === "AM" && hour === 12) hour = 0;
      } else {
        const hm = input.split(":");
        if (hm.length !== 2) throw new Error();

        hour = parseInt(hm[0]);
        minute = parseInt(hm[1]);
      }

      if (
        isNaN(hour) ||
        isNaN(minute) ||
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59
      ) {
        throw new Error();
      }

      const now = new Date();
      const triggerDate = new Date();
      triggerDate.setHours(hour);
      triggerDate.setMinutes(minute);
      triggerDate.setSeconds(0);

      if (triggerDate <= now) {
        triggerDate.setDate(triggerDate.getDate() + 1);
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Medicine Reminder 💊",
          body: `Time to take ${name}`,
          sound: "default",
        },
        trigger: {
          type: "date",
          date: triggerDate,
        },
      });

      /* 🔥 ADDED FIRESTORE SAVE (DOES NOT REMOVE ASYNC STORAGE) */
      await addDoc(collection(db, "medicines"), {
        patientId: auth.currentUser?.uid,
        name: name,
        time: time,
        createdAt: new Date(),
      });

      const newList = [...medicines, { name, time }];
      setMedicines(newList);
      await saveToStorage(newList);

      setName("");
      setTime("");

      alert("Medicine scheduled successfully");
    } catch {
      alert("Enter valid time like 3:55 PM or 15:55");
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Schedule Medicine</Text>

      <TextInput
        placeholder="Medicine Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Time (e.g. 3:45 PM or 15:45)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={saveMedicine}>
        <Text style={styles.buttonText}>SAVE MEDICINE</Text>
      </TouchableOpacity>

      <FlatList
        data={medicines}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>
            • {item.name} - {item.time}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: "#7B4BB7",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#7B4BB7",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CFA9F3",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    color: "#000",
  },
  button: {
    backgroundColor: "#7B4BB7",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
});