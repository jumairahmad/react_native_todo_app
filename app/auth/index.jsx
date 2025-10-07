import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
const AuthScreen = () => {

    const {login,register}= useAuth();
    const router= useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');

   const handleAuth= async()=>{
    if (!email.trim() || !password.trim()){
        setError('Email and password are required');
        return;
    }
    if(isRegistering && (password !== confirmPassword)){
        setError('Passwords do not match');
        return;
    }
    let response;

    if(isRegistering){
        response= await register(email,password);
    }else {
        response= await login(email,password);  
    }

    if (response.error){
        Alert.alert('Error', response.error);
    }
    router.replace('/notes');


   }

    return (
        <View style={styles.container}>
            
           <Text style={styles.header}>
            {isRegistering ? 'Sign Up' : 'Login'}
           </Text>
           {error ? <Text style={styles.error}>{error}</Text> : null}
        
          <TextInput 
          style={styles.input}
          placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          ></TextInput>

<TextInput 
          style={styles.input}
          placeholder="Password"
            value={password}
            onChangeText={setPassword}
            keyboardType="password"
            secureTextEntry
            placeholderTextColor="#aaa"
            textContentType="none"
          ></TextInput>


          {isRegistering && (
            <TextInput 
            style={styles.input}
            placeholder="confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              keyboardType="password"
              secureTextEntry
              placeholderTextColor="#aaa"
              textContentType="none"
            ></TextInput>
          )}

          <TouchableOpacity
          style={styles.button}
          onPress={handleAuth}
          >
            <Text style={styles.buttonText}>
                {isRegistering ? 'Sign Up' : 'Login'}
            </Text>
          </TouchableOpacity>


         <TouchableOpacity onPress={()=>setIsRegistering(!isRegistering)} >
         <Text style={styles.switchText}>
                {isRegistering ? 'Already have an accout? Login' : 'Dont have an account sign Up'}
            </Text>
            </TouchableOpacity> 

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        padding:12,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    switchText: {
        color: '#007bff',
        textAlign: 'center',
        marginTop: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    });

export default AuthScreen;    