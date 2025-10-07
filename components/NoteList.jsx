import { FlatList, View } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete, onUpdate }) => {
  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        )}
      />
    </View>
  );
};

export default NoteList;
