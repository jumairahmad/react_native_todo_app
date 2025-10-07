import { ID } from 'react-native-appwrite';
import { account } from './appwrite';


const authService = {

    async register(email,password){
        try{

            const response = await account.create(ID.unique(),email,password);
            return {response};
        }catch(error){
          return {error: error.message};
        }
    },

    async login(email,password){
        try{

            const response =await account.createEmailPasswordSession(email,password);
            return {response};
        }catch(error){
          return {error: error.message};
        }
    },
    async getUser(){
        try{
            const response = await account.get();
            return {response};
        }catch(error){
          return {error: error.message};
        }
    },
    async logout(){
        try{
            const response = await account.deleteSession('current');
            return {response};
        }catch(error){
          return {error: error.message};
        }
    },
    
}

export default authService;