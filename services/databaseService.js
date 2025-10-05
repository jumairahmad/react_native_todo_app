import { database } from './appwrite';

const databaseService = {
    async listDocuments(dbId,colId){

        try {

            const response = await database.listDocuments(dbId,colId);
            return response.documents || [];
        }catch(error){
        console.log('Error fetching documents:', error.message);
        return {error: error.message};
        }
    },

    async createDocument(dbId,colId,data,id=null){
        try {

            const response = await database.createDocument(dbId,colId,id || undefined,data);
            return response.documents || [];
        }catch(error){
            console.log('Error creating document:', error.message);
            return {error: error.message};
        }
    },

    async deleteDocument(dbId,colId,docId){
        try {

            await database.deleteDocument(dbId,colId,docId);
            return {success: true};
        }catch(error){
            return {error: error.message};
        }
    },
    async updateNote(dbId,colId,docId,data){
        try {
            const response = await database.updateDocument(dbId,colId,docId,data);
            if (response){
                return {data: response};
            }else {
                return {error: 'Failed to update note'};
            }
        } catch(error){
            return {error: error.message};
        }
    }
}

export default databaseService;