import { FlatList, View } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes,onDelete,onUpdate }) => {
  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <NoteItem note={item} 
        onDelete={onDelete}
        onUpdate={onUpdate}
        />}
      />
    </View>
  );
};

export default NoteList;
