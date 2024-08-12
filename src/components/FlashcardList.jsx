import React, { useState } from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ flashcards = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
      }, 600); // Match this duration with the flip animation duration
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }
  };

  const handlePrev = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
        );
      }, 600); // Match this duration with the flip animation duration
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
      );
    }
  };

  if (flashcards.length === 0) {
    return <p className="text-center">No flashcards available</p>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={handlePrev} disabled={flashcards.length === 1}>
          Previous
        </button>
        <button className="btn btn-primary" onClick={handleNext} disabled={flashcards.length === 1}>
          Next
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <Flashcard 
          flashcard={flashcards[currentIndex]} 
          flip={handleFlip} 
          isFlipped={isFlipped} 
        />
      </div>
    </div>
  );
};

export default FlashcardList;
