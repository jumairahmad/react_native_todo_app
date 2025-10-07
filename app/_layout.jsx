import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

const HeaderLogout= () => {
  const {user,logout}= useAuth();

  return user ? (
    <TouchableOpacity style={styles.logout} onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ): null;
}


 const RootLayout = ()=> {
  return (
  <AuthProvider>
  <Stack
  screenOptions={{
    headerStyle:{
      backgroundColor:'#f4511e',
    },
    
    headerTintColor:'#ffffff',
    headerTitleStyle:{
      fontWeight:'bold',
      fontSize:20,
      
    },
    contentStyle:{
      paddingHorizontal:10,
      paddingVertical:10,
      backgroundColor:'#f0f0f0',
    },
    headerRight: ()=><HeaderLogout />,

  }} >

    <Stack.Screen name='index' options={{title:'Home Page', headerTitleAlign:'center'}} />
    <Stack.Screen name='notes' options={{title:'Notes', headerTitleAlign:'center'}} />
    <Stack.Screen name='auth' options={{title:'Login', headerTitleAlign:'center'}} />
    </Stack>
    </AuthProvider>
    );
}
const styles= StyleSheet.create({
  logout:{
    marginRight:10,
    padding:5,
    backgroundColor:'#ff6347',
    borderRadius:5,
  },
  logoutText:{
    color:'#fff',
    fontSize:16,
  }})

export default RootLayout;
