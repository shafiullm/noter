import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { FaTrash } from "react-icons/fa"; // Import the trash icon

function Home({ isAuth }) {
  const [noteLists, setNoteLists] = useState([]);
  const noteCollectionRef = collection(db, "notes");

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
  };

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(noteCollectionRef);
      setNoteLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNotes();
  }, [deleteNote]);

  return (
    <div className="homePage m-4">
      <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {noteLists.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-lg p-4">
            <div className="noteHeader flex justify-between items-center">
              <div className="noteTitle">
                <h1 className="text-xl font-semibold">{note.title}</h1>
              </div>
              {isAuth && note.author.id === auth.currentUser.uid && (
                <div className="deleteNote">
                  <button
                    onClick={() => {
                      deleteNote(note.id);
                    }}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
            <div className="noteTextContainer mt-2 overflow-auto h-44">
              <p className="whitespace-pre-wrap">{note.noteText}</p>
            </div>
            <h3 className="text-gray-600 mt-4 font-semibold">
              @{note.author.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
