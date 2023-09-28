import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreateNote({ isAuth }) {
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const noteCollectionRef = collection(db, "notes");
  let navigate = useNavigate();

  const createANote = async () => {
    await addDoc(noteCollectionRef, {
      title,
      noteText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded-lg mt-16">
        <h2 className="text-4xl font-bold text-center mb-4">
          Create a Public Note
        </h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-black dark:bg-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="note"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Note:
          </label>
          <textarea
            id="note"
            rows="4"
            className="w-full px-3 py-2 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-black dark:bg-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your notes here..."
            onChange={(e) => {
              setNoteText(e.target.value);
            }}
          ></textarea>
        </div>

        <button
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
          onClick={createANote}
        >
          Add Note
        </button>
      </div>
    </div>
  );
}

export default CreateNote;
