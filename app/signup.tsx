import { useRouter } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const options = {
  headerShown: false,
};

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      // 1️⃣ Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2️⃣ Save user in Firestore using user.uid
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: null, // role not selected yet
      });

      // 3️⃣ Go to role selection
      router.replace("/roleSelection");

    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Gmail Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        color="#000000"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#999"
        autoCapitalize="none"
        color="#000000"   
/>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Login</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#7B4BB7",
    fontWeight: "bold",
    textAlign: "center",
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
  loginText: {
    textAlign: "center",
    color: "#7B4BB7",
    fontSize: 14,
  },
});