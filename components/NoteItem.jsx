import { MaterialIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
const NoteItem= ({note,onDelete,onUpdate}) => {

    const [isEditing, setIsEditing]= useState(false);
    const [editedText,setEditedText]= useState(note.text);
    const inputRef= useRef(null);


    const handleSave=()=>{
        if (editedText.trim()=== ''){
            setEditedText(note.text);
            setIsEditing(false);
            return;
        }

        if (editedText !== note.text){
            onUpdate(note.$id, editedText);
        }
        setIsEditing(false);

    }

    

    return (
        <View style={styles.noteItem}>

       {isEditing? 
       
       (
      <TextInput 
      ref={inputRef}
      style={styles.input}
      value={editedText}
      autoFocus
      onSubmitEditing={handleSave}
      onChangeText={setEditedText}
      returnKeyType="done"
      />
        
       ):(
     <Text style={styles.noteText}>{note.text}</Text>
       ) }


     <View style={styles.actions}>

       {isEditing ? (
         <TouchableOpacity 
         onPress={()=>{
            
            handleSave();
            inputRef.current.blur();
         }

         }>
         
         <MaterialIcons name="save" size={24} color="blue"/>
 
         </TouchableOpacity>
       ):(


        <TouchableOpacity 
        onPress={()=>setIsEditing(true)}>
        
        <MaterialIcons name="edit" size={24} color="blue"/>

        </TouchableOpacity>

       )}

     </View>


        <TouchableOpacity 
        onPress={()=>onDelete(note.$id)}>
        
        <MaterialIcons name="delete" size={24} color="red"/>

        </TouchableOpacity>

    </View>
    );
}

const styles= StyleSheet.create({
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,

    },

    noteText: {
        fontSize: 18,

    },
    actions: {
        flexDirection: 'row',
       
    },
    

});
export default NoteItem;