import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { router } from 'expo-router';


export default function HomeScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.inputFormContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={username}
            autoCapitalize='none'
            onChangeText={setUsername}
            placeholder="Enter username"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <Pressable
          onPress={() => console.log(username, password)}
          style={styles.button}
        >
          <Text style={styles.buttonFont}>Login</Text>
        </Pressable>

        <View style={styles.registerTextContainer}>
          <Text style={styles.registerText}>{`Doesn't have account yet? `}</Text>
          <Pressable
            onPress={() => router.push('/register')}
          >
            <Text style={styles.registerTextHref}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#f0f0f0",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputFormContainer: {
    paddingHorizontal: 10,
    paddingVertical: 40,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: '40%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    gap: 10
  },
  inputContainer: {
    gap: 10,
    width: '90%'
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
    fontWeight: 700
  },
  normalText: {
    color: '#454'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    borderColor: '#d5d4d4ff',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8
  },
  buttonFont: {
    fontSize: 16
  },
  registerTextContainer: {
    flexDirection: 'row',
  },
  registerText: {

  },
  registerTextHref: {
    color: 'blue'
  }
});
