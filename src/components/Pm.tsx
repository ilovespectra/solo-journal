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

const PmEntry: React.FC = () => {
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false); // New state for success message
    const [formData, setFormData] = useState({
      accomplishments: '',
      challenges: '',
      compassion: '',
      whatILearned: '',
      intentionsForTomorrow: '',
      publicKey: '',
    });

  const { publicKey } = useWallet();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { accomplishments, challenges, compassion, whatILearned, intentionsForTomorrow } = formData;

    try {
      await addDoc(collection(db, 'PM Entries'), {
        accomplishments,
        challenges,
        compassion,
        whatILearned,
        intentionsForTomorrow,
        publicKey: publicKey?.toBase58(),
        timestamp: serverTimestamp(),
      });

      console.log('PM journal entry saved successfully');
      setFormData({
        accomplishments: '',
        challenges: '',
        compassion: '',
        whatILearned: '',
        intentionsForTomorrow: '',
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
      <h1>pm entry</h1>
      <form onSubmit={handleSubmit} id="amEntryForm">
      <div>
          <label className="input-label" htmlFor="accomplishments">
          accomplishments: list three things you achieved today.
          </label><br></br>
          <textarea
          id="accomplishments"
          className="text-input"
          required
          rows={3}
          name="accomplishments"
          value={formData.accomplishments}
          onChange={handleChange}
        ></textarea>
        </div>
        <div>
          <label className="input-label" htmlFor="challenges">
          challenges: describe any obstacles you faced.
          </label><br></br>
          <textarea
          id="challenges"
          className="text-input"
          required
          rows={3}
          name="challenges"
          value={formData.challenges}
          onChange={handleChange}
        ></textarea>
        </div>
        <div>
          <label className="input-label" htmlFor="compassion">
            compassion: reflect on moments of self-kindness.
          </label><br></br>
          <textarea
          id="compassion"
          className="text-input"
          required
          rows={3}
          name="compassion"
          value={formData.compassion}
          onChange={handleChange}
        ></textarea>
        </div>
        <div>
          <label className="input-label" htmlFor="whatILearned">
          what i learned: note any insights or lessons from the day.
          </label><br></br>
          <textarea
          id="whatILearned"
          className="text-input"
          required
          rows={3}
          name="whatILearned"
          value={formData.whatILearned}
          onChange={handleChange}
        ></textarea>
        </div>
        <div>
          <label className="input-label" htmlFor="intentionsForTomorrow">
            intentions for tomorrow: set a positive intention for the next day.
          </label><br></br>
          <textarea
          id="intentionsForTomorrow"
          className="text-input"
          required

          rows={3}
          name="intentionsForTomorrow"
          value={formData.intentionsForTomorrow}
          onChange={handleChange}
        ></textarea>
        </div>
        <button className="btn">
          submit
        </button>
      </form>
      {/* Success message */}
      {isSuccessMessageVisible && (
        <p><i>your pm journal entry has been logged successfully!</i></p>
      )}
    </div>
  );
};

export default PmEntry;
