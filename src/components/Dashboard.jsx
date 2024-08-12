import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('https://flashback-two.vercel.app/api/flashcards');
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('https://flashback-two.vercel.app/api/flashcards', form);
      setFlashcards([...flashcards, { id: response.data.id, ...form }]);
      setForm({ question: '', answer: '' });
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`https://flashback-two.vercel.app/api/flashcards/${editId}`, form);
      setFlashcards(flashcards.map(flashcard =>
        flashcard.id === editId ? { ...flashcard, ...form } : flashcard
      ));
      setForm({ question: '', answer: '' });
      setEditId(null);
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://flashback-two.vercel.app/api/flashcards/${id}`);
      setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const startEdit = (flashcard) => {
    setForm({ question: flashcard.question, answer: flashcard.answer });
    setEditId(flashcard.id);
  };

  return (
    <div>


      <div className="container mt-4">
        <h1>Internal Dashboard</h1>

        <div className="card mb-4">
          <div className="card-body">
            <h2>{editId ? 'Edit Flashcard' : 'Add Flashcard'}</h2>
            <div className="form-group">
              <input
                type="text"
                name="question"
                value={form.question}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Question"
              />
              <input
                type="text"
                name="answer"
                value={form.answer}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Answer"
              />
              <button
                className="btn btn-primary"
                onClick={editId ? handleEdit : handleAdd}
              >
                {editId ? 'Update Flashcard' : 'Add Flashcard'}
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2>Flashcards</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {flashcards.length > 0 ? (
                  flashcards.map((flashcard) => (
                    <tr key={flashcard.id}>
                      <td>{flashcard.question}</td>
                      <td>{flashcard.answer}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm mr-2"
                          onClick={() => startEdit(flashcard)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(flashcard.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No flashcards available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
