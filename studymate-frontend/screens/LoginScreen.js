import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
const BASE_URL = "http://192.168.18.29:5000"; // your PC's local IP
const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password }, {
  headers: { "Content-Type": "application/json" }
});
      alert("Welcome " + res.data.user.name + " (" + res.data.user.mbti + ")");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudyMate Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginBottom: 15, backgroundColor: "#fff" },
  button: { width: "80%", padding: 15, backgroundColor: "#4A90E2", borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 15, color: "#4A90E2" },
});
 
