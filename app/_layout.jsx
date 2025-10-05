import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
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

  }} >

    <Stack.Screen name='index' options={{title:'Home Page', headerTitleAlign:'center'}} />
    <Stack.Screen name='notes' options={{title:'Notes', headerTitleAlign:'center'}} />
    <Stack.Screen name='auth' options={{title:'Auth', headerTitleAlign:'center'}} />
    </Stack>
    </AuthProvider>
    );
}

export default RootLayout;
