import React, { useState, FormEvent } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "solo-journal.firebaseapp.com",
  projectId: "solo-journal",
  storageBucket: "solo-journal.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Freewrite: React.FC = () => {
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false); // New state for success message
    const [formData, setFormData] = useState({
      freeWrite: '',
      publicKey: '',
    });

  const { publicKey } = useWallet();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { freeWrite } = formData;

    try {
      await addDoc(collection(db, 'Freewrite Entries'), {
        freeWrite,
        publicKey: publicKey?.toBase58(),
        timestamp: serverTimestamp(),
      });

      console.log('Freewrite journal entry saved successfully');
      setFormData({
        freeWrite: '',
        publicKey: '',
      });
      setSuccessMessageVisible(true); // Show the success message
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <h1>freewrite entry</h1>
      <form onSubmit={handleSubmit} id="FreewriteEntryForm">
      <div>
          <label className="input-label" htmlFor="freeWrite">
          write whatever is on your mind...
          </label><br></br>
          <textarea
          id="freeWrite"
          className="text-input"
          required
          rows={3}
          name="freeWrite"
          value={formData.freeWrite}
          onChange={handleChange}
        ></textarea>
        </div>
        <button className="btn">
          submit
        </button>
      </form>
      {/* Success message */}
      {isSuccessMessageVisible && (
        <p><i>your freewrite journal entry has been logged successfully!</i></p>
      )}
    </div>
  );
};

export default Freewrite;
