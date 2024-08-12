import React from 'react';
import './Flashcard.css'; 

const Flashcard = ({ flashcard, flip, isFlipped }) => {
  const { question, answer } = flashcard;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="flashcard card" onClick={flip}>
            <div className={`inner ${isFlipped ? 'flipped' : ''}`}>
              <div className="front card-body">
                <h5 className="card-title">Question</h5>
                <p className="card-text">{question}</p>
              </div>
              <div className="back card-body">
                <h5 className="card-title">Answer</h5>
                <p className="card-text">{answer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
