import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { FaTrash } from "react-icons/fa";

function Home({ isAuth, setIsAuth }) {
  const [noteLists, setNoteLists] = useState([]);
  const noteCollectionRef = collection(db, "notes");

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      window.location.reload();
    });
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
      {!isAuth && (
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                Sign In Now To Create A Note
              </h2>
              <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                Sign in now with Google to post a note on the public wall
              </p>
              <button
                type="button"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
                onClick={signInWithGoogle}
              >
                <svg
                  class="w-4 h-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {noteLists.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-lg p-4">
            <div className="noteHeader flex justify-between items-center">
              <div className="noteTitle">
                <h1 className="text-xl font-semibold">{note.title}</h1>
              </div>
              {userIsAuth && note.author.id === auth.currentUser.uid && (
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
