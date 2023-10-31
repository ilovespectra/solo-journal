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

const AmEntry: React.FC = () => {
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false); // New state for success message
    const [formData, setFormData] = useState({
      gratitude: '',
      feelings: '',
      intentions: '',
      selfCompassion: '',
      focus: '',
      publicKey: '',
    });

  const { publicKey } = useWallet();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { gratitude, feelings, intentions, selfCompassion, focus } = formData;

    try {
      await addDoc(collection(db, 'AM Entries'), {
        gratitude,
        feelings,
        intentions,
        selfCompassion,
        focus,
        publicKey: publicKey?.toBase58(),
        timestamp: serverTimestamp(),
      });

      console.log('AM journal entry saved successfully');
      setFormData({
        gratitude: '',
        feelings: '',
        intentions: '',
        selfCompassion: '',
        focus: '',
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
      <h1>am entry</h1>
      <form onSubmit={handleSubmit} id="amEntryForm">
      <div>
          <label className="input-label" htmlFor="gratitude">
            gratitude: list three things you&apos;re grateful for today.
          </label><br></br>
          <textarea
          id="gratitude"
          className="text-input"
          required
          rows={3}
          name="gratitude"
          value={formData.gratitude}
          onChange={handleChange}
        ></textarea>
        </div>
        <div>
          <label className="input-label" htmlFor="feelings">
            feelings: describe how you&apos;re feeling right now.
          </label><br></br>
          <textarea
          id="feelings"
          className="text-input"
          required
          rows={3}
          name="feelings"
          value={formData.feelings}
          onChange={handleChange}
        ></textarea>
        </div>
        <div>
          <label className="input-label" htmlFor="intentions">
            intentions: set a positive intention for the day.
          </label><br></br>
          <textarea
          id="intentions"
          className="text-input"
          required
          rows={3}
          name="intentions"
          value={formData.intentions}
          onChange={handleChange}
        ></textarea>
        </div>
        <div>
          <label className="input-label" htmlFor="selfCompassion">
            self-compassion: write a kind message to yourself.
          </label><br></br>
          <textarea
          id="selfCompassion"
          className="text-input"
          required
          rows={3}
          name="selfCompassion"
          value={formData.selfCompassion}
          onChange={handleChange}
        ></textarea>
        </div>
        <div>
          <label className="input-label" htmlFor="focus">
            focus: identify one task or goal for today.
          </label><br></br>
          <textarea
          id="focus"
          className="text-input"
          required
          rows={3}
          name="focus"
          value={formData.focus}
          onChange={handleChange}
        ></textarea>
        </div>
        <button className="btn">
          submit
        </button>
      </form>
      {/* Success message */}
      {isSuccessMessageVisible && (
        <p><i>your am journal entry has been logged successfully!</i></p>
      )}
    </div>
  );
};

export default AmEntry;
