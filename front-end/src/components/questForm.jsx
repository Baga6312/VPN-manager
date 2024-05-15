import React, { useState } from 'react';

const QuestForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() !== '') {
      onSubmit(question);
      setQuestion(''); // Clear the input field after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestForm;
