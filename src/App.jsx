import React, { useEffect, useState } from 'react';
import FlashcardList from './components/FlashcardList';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('https://flashback-two.vercel.app/api/flashcards');
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  return (
    <div>
      <h1>Flashcard App</h1>
      <Navbar/>
      <FlashcardList flashcards={flashcards} />
     
    </div>
  );
};

export default App;
