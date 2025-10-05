import { ID } from "react-native-appwrite";
import databaseService from "./databaseService";


const dbId= process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const colId= process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    async getNotes(){

        const response = await databaseService.listDocuments(dbId,colId);

        if (response.error){
            return {error: response.error};
        }
        return {data: response};
    },

    async addNote(text){
        if (!text || text.trim() === ''){
            return {error: 'Note text cannot be empty'};
        }
        const data = {
            text: text.trim(),
           // createdAt: new Date().toISOString()

        }
        const response = await databaseService.createDocument(dbId,colId,data,ID.unique());
        if (response.error){
            return {error: response.error};
        }
        return {data: response};
    },
    async deleteNote(noteId){
        if (!noteId){
            return {error:'Note ID is needed to delete a note'};
        }
        const response = await databaseService.deleteDocument(dbId,colId,noteId);
        if (response.error){
            return {error: response.error};
        }
        return {success: true};
    },

    async  updateNote(noteId,text){
        if (!noteId){
            return {error:"Note Id is required to update a note"};
        }
        if (!text || text.trim() === ''){
            return {error: 'Note text cannot be empty'};
        }

        const data ={
            text: text.trim(),
           // updatedAt: new Date().toISOString()
        }
        const response =await databaseService.updateNote(dbId,colId,noteId,data);

        if (response.error){
            return {error: response.error};
        }
        return {data: response};
      
    }
}

export default noteService;