import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, DocumentData, Query } from 'firebase/firestore';
import React, { useState, FormEvent, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

function ViewEntries() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [entryList, setEntryList] = useState([]);
    const { publicKey } = useWallet();

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: "solo-journal.firebaseapp.com",
      projectId: "solo-journal",
      storageBucket: "solo-journal.appspot.com",
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const fetchAndDisplayEntries = () => {
        const entries = [];
    
        if (!selectedType) {
            return;
        }
    
        const entriesCollection = collection(db, selectedType);
    
        let entryQuery: Query<DocumentData> = entriesCollection;
    
        if (selectedDate) {
            query(
                entryQuery,
                where("timestamp", ">=", new Date(selectedDate + "T00:00:00")),
                where("timestamp", "<=", new Date(selectedDate + "T23:59:59"))
            );
        }
    
        if (publicKey) {
            entryQuery = query(entryQuery, where("publicKey", "==", publicKey.toBase58()));
        }
    
        getDocs(entryQuery)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const entryData = doc.data();
                    const entryContent = {
                        type: selectedType,
                        date: entryData.timestamp.toDate().toLocaleDateString(),
                        // Add other fields as needed based on the entry type
                        ...entryData, // Spread all fields from Firestore data
                    };
                    entries.push(entryContent);
                });
    
                setEntryList(entries);
            })
            .catch((error) => {
                console.error("Error getting documents: ", error);
            });
    };

    const handleDateChange = (event: FormEvent<HTMLInputElement>) => {
        setSelectedDate(event.currentTarget.value);
    };

    const handleTypeChange = (event: FormEvent<HTMLSelectElement>) => {
        setSelectedType(event.currentTarget.value);
    };

    return (
        <div>
           <label htmlFor="dateFilter" style={{ color: 'white' }}>Select Date:</label>
        <input
        type="date"
        id="dateFilter"
        onChange={handleDateChange}
        value={selectedDate}
        style={{ color: 'white', backgroundColor: '#333' }} // Set text color to black
        />

        <label htmlFor="typeFilter" style={{ color: 'white' }}>Select Type:</label>
        <select
        id="typeFilter"
        onChange={handleTypeChange}
        value={selectedType}
        style={{ color: 'white', backgroundColor: '#333' }} // Set text color to black
        >
        <option value="">select type</option>
        <option value="AM Entries">am entries</option>
        <option value="PM Entries">pm entries</option>
        <option value="Freewrite Entries">freewrite entries</option>
        </select>

            
            <button className="group w-30 m-2 btn disabled:animate-none lowercase" onClick={fetchAndDisplayEntries}>apply filters</button>
            <div style={{ borderBottom: '2px dotted white', marginBottom: '30px', marginTop: '15px'}}></div>
            <div id="entryList">
    {entryList.map((entry, index) => (
        <div key={index}>
            <p><strong>date:</strong> {entry.date}</p>

            {/* Render fields based on entry type */}
            {entry.type === "AM Entries" && (
                <>
                    <p><strong>gratitude:</strong> {entry.gratitude}</p>
                    <p><strong>feelings:</strong> {entry.feelings}</p>
                    <p><strong>intentions:</strong> {entry.intentions}</p>
                    <p><strong>self-compassion:</strong> {entry.selfCompassion}</p>
                    <p><strong>focus:</strong> {entry.focus}</p>
                    <div style={{ borderBottom: '2px dotted white', marginBottom: '15px', marginTop: '15px'}}></div>
                </>
            )}

            {entry.type === "PM Entries" && (
                <>
                    <p><strong>accomplishments:</strong> {entry.accomplishments}</p>
                    <p><strong>challenges:</strong> {entry.challenges}</p>
                    <p><strong>compassion:</strong> {entry.compassion}</p>
                    <p><strong>what i learned:</strong> {entry.whatILearned}</p>
                    <p><strong>intentions for tomorrow:</strong> {entry.intentionsForTomorrow}</p>
                    <div style={{ borderBottom: '2px dotted white', marginBottom: '15px', marginTop: '15px'}}></div>
                </>
            )}

            {entry.type === "Freewrite Entries" && (
                <>
                    <p><strong>entry:</strong> {entry.freeWrite}</p>
                    <div style={{ borderBottom: '2px dotted white', marginBottom: '15px', marginTop: '15px'}}></div>
                </>
            )}

            {/* Render other fields here */}
        </div>
    ))}
</div>
        </div>
    );
}

export default ViewEntries;
