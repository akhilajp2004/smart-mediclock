import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

const PRIMARY = "#6A1B9A";
const LIGHT = "#EDE7F6";

export default function PatientDetails() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const [history, setHistory] = useState("");
  const [gender, setGender] = useState("");

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "patient",
      name,
      age,
      gender,
      disease,
      medicalHistory: history,
      createdAt: new Date(),
    });

   router.replace("/(tabs)");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.stepText}>Step 1 of 1</Text>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>
      </View>

      <Text style={styles.title}>Complete Your Profile</Text>

      <View style={styles.card}>

        {/* Name */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={20} color={PRIMARY} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        {/* Age */}
        <View style={styles.inputContainer}>
          <FontAwesome5 name="birthday-cake" size={18} color={PRIMARY} />
          <TextInput
            placeholder="Age"
            placeholderTextColor="#888"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        {/* Gender Radio Buttons */}
        <Text style={styles.label}>Select Gender</Text>
        <View style={styles.radioContainer}>
          {["Male", "Female", "Other"].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.radioOption}
              onPress={() => setGender(item)}
            >
              <View style={styles.radioCircle}>
                {gender === item && <View style={styles.selectedRb} />}
              </View>
              <Text style={styles.radioText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Disease */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="local-hospital" size={20} color={PRIMARY} />
          <TextInput
            placeholder="Diseases (e.g. Diabetes)"
            placeholderTextColor="#888"
            value={disease}
            onChangeText={setDisease}
            style={styles.input}
          />
        </View>

        {/* Medical History */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="history" size={20} color={PRIMARY} />
          <TextInput
            placeholder="Medical History"
            placeholderTextColor="#888"
            value={history}
            onChangeText={setHistory}
            style={styles.input}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F5FB",
  },

  progressContainer: {
    marginBottom: 20,
  },

  stepText: {
    color: PRIMARY,
    fontWeight: "bold",
    marginBottom: 5,
  },

  progressBarBackground: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },

  progressBarFill: {
    height: 8,
    width: "100%",
    backgroundColor: PRIMARY,
    borderRadius: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY,
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: LIGHT,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  input: {
    flex: 1,
    padding: 12,
  },

  label: {
    fontWeight: "bold",
    color: PRIMARY,
    marginBottom: 8,
  },

  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },

  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PRIMARY,
  },

  radioText: {
    color: "#333",
  },

  button: {
    backgroundColor: PRIMARY,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});