import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // ✅ Local backend (change IP to your PC’s IP if needed)
      //const BASE_URL = "http://192.168.18.29:5000";
     const BASE_URL = 'https://studymate-backend-8f8g.onrender.com';

      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Welcome " + res.data.user.name + " (" + res.data.user.mbti + ")");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://i.ibb.co/vm1dXvL/mbti-brain.png" }} style={styles.logo} />
      <Text style={styles.title}>StudyMate Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text onPress={() => navigation.navigate("Signup")} style={styles.link}>
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f6f8" },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginBottom: 15, backgroundColor: "#fff" },
  button: { width: "80%", padding: 15, backgroundColor: "#4A90E2", borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 15, color: "#4A90E2" },
});
