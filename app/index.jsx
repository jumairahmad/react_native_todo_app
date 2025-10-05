import PostItImage from '@/assets/images/post-it.png';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen= ()=> {
  const router=useRouter();
  return (
    <View style={styles.container}>

      <Image source={PostItImage} style={styles.imagecv}/>
      <Text style={styles.title}>Wellcome To Notes App</Text>
      <Text style={styles.subtitle}>Capture Your Thoughts any time any where</Text>
   
      <TouchableOpacity 
      
      style={styles.button}
      onPress={()=>router.push('/notes')}
      >
        
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#fff',
  
  },
  
  imagecv:{
   width:100,
    height:100,
    marginBottom:20,
    borderRadius:20,
  },

  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:10,
    color:'#333',
    textAlign:'center',
  },
  subtitle:{
    fontSize:14,
    color:'#666',
    textAlign:'center',
  },
  button:{
    marginTop:20,
    backgroundColor:'#007bff',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:8,
    alignItems:'center',
  },

  buttonText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
  },

});

export default HomeScreen;