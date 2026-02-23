import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const options = {
  headerShown: false,
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        if (!userData.role) {
          router.replace("/roleSelection");
        } else if (userData.role === "patient") {
          router.push("/(tabs)");
        } else if (userData.role === "caregiver") {
          router.replace("/caregiverDashboard");
        } else if (userData.role === "doctor") {
          router.replace("/doctorDashboard");
        } else {
          router.replace("/roleSelection");
        }
      } else {
        router.replace("/roleSelection");
      }
    } catch (error: any) {
      alert("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>

      {/*  NEW HEADER SECTION */}
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.title}>MEDICLOCK</Text>
      <Text style={styles.subtitle}>Never miss a dose 💊</Text>

      <TextInput
        placeholder="Gmail Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#999"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.signupText}>
          New user? <Text style={{ fontWeight: "bold" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    padding: 25,
  },
  welcome: {
    fontSize: 18,
    textAlign: "center",
    color: "#7B4BB7",
  },
  title: {
    fontSize: 32,
    color: "#7B4BB7",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#7B4BB7",
    marginBottom: 40,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#B784E6",
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    color: "#000",
  },
  button: {
    backgroundColor: "#7B4BB7",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    textAlign: "center",
    color: "#7B4BB7",
    fontSize: 14,
  },
});