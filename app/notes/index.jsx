import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddNoteModal from "../../components/AddNoteModal";
import NoteList from "../../components/NoteList";
import { useAuth } from "../../context/AuthContext";
import notesService from "../../services/noteService";

const NotesScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth"); // ✅ use '/auth' not '/login' (if your auth screen folder is "auth")
    }
  }, [user, authLoading]);

  // Fetch notes after login
  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await notesService.getNotes(user.response.$id);

    if (response.error) {
      setError("Failed to load notes");
      Alert.alert("Error", response.error);
    } else {
      setNotes(response.data);
      setError("");
    }
    setLoading(false);
  };

  const addNote = async () => {
    if (newNote.trim() === "") return;

    const response = await notesService.addNote(newNote,user.response.$id);
    if (response.error) {
        console.log(user.$id);
      Alert.alert("Error", response.error+user.$id);
    } else {
        const newNoteData = response.data ||response;
        console.log(newNoteData);
    setNotes((prevNotes) => [newNoteData, ...prevNotes]);
  
    }

    setNewNote("");
    setModalVisible(false);
  };

  const deleteNote = async (noteId) => {
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await notesService.deleteNote(noteId);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            setNotes(notes.filter((note) => note.$id !== noteId));
          }
        },
      },
    ]);
  };

  const updateNote = async (noteId, newText) => {
    if (!newText.trim()) {
      Alert.alert("Error", "Note text cannot be empty");
      return;
    }

    const response = await notesService.updateNote(noteId, newText);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prev) =>
        prev.map((note) =>
          note.$id === noteId ? { ...note, text: newText } : note
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {notes.length === 0 && !error ? (
            <Text style={styles.noNotesText}>No notes available. Add a new note!</Text>
          ):(
             <NoteList notes={notes} onDelete={deleteNote} onUpdate={updateNote} />
          )}
         
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
    noNotesText: {
        textAlign: "center",
        color: "orange",
        marginTop: 20,
        fontSize: 16,
    },
});

export default NotesScreen;
