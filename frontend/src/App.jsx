import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, populateForm, addChatMessage, clearForm } from './store/interactionSlice';
import axios from 'axios';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.interaction.formData);
  const chatMessages = useSelector((state) => state.interaction.chatMessages);
  const [chatInput, setChatInput] = useState('');

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/interaction/manual', formData);
      alert(res.data.message);
      dispatch(clearForm());
    } catch (err) {
      console.error(err);
      alert('Error saving interaction');
    }
  };

  const handleChatSend = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    dispatch(addChatMessage({ sender: 'user', text: chatInput }));
    const userMsg = chatInput;
    setChatInput('');

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/interaction/chat', { message: userMsg });
      const reply = res.data.reply;
      dispatch(addChatMessage({ sender: 'ai', text: reply }));

      // Try parsing JSON if AI returned structural update data
      try {
        const startIdx = reply.indexOf('{');
        const endIdx = reply.lastIndexOf('}');
        if (startIdx !== -1 && endIdx !== -1) {
          const jsonStr = reply.substring(startIdx, endIdx + 1);
          const parsedData = JSON.parse(jsonStr);
          if (parsedData.data) {
            dispatch(populateForm(parsedData.data));
          } else {
            dispatch(populateForm(parsedData));
          }
        }
      } catch (e) {
        // Response wasn't structured JSON data to sync form, standard text reply handled
      }

    } catch (err) {
      dispatch(addChatMessage({ sender: 'ai', text: 'Failed to communicate with AI Agent.' }));
    }
  };

  return (
    <div className="crm-container">
      <h2>Log HCP Interaction</h2>
      <div className="main-layout">

        {/* Left Side: Form Interface  */}
        <form className="form-panel" onSubmit={handleFormSubmit}>
          <h3>Interaction Details</h3>
          <div className="row">
            <div className="group">
              <label>HCP Name</label>
              <input type="text" value={formData.hcp_name} onChange={(e) => handleInputChange('hcp_name', e.target.value)} placeholder="Search or select HCP..." required />
            </div>
            <div className="group">
              <label>Interaction Type</label>
              <select value={formData.interaction_type} onChange={(e) => handleInputChange('interaction_type', e.target.value)}>
                <option value="Meeting">Meeting</option>
                <option value="Call">Call</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="group">
              <label>Date</label>
              <input type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} />
            </div>
            <div className="group">
              <label>Time</label>
              <input type="time" value={formData.time} onChange={(e) => handleInputChange('time', e.target.value)} />
            </div>
          </div>

          <div className="group">
            <label>Attendees</label>
            <input type="text" value={formData.attendees} onChange={(e) => handleInputChange('attendees', e.target.value)} placeholder="Enter names..." />
          </div>

          <div className="group">
            <label>Topics Discussed</label>
            <textarea value={formData.topics_discussed} onChange={(e) => handleInputChange('topics_discussed', e.target.value)} placeholder="Enter key discussion points..."></textarea>
          </div>

          <div className="group" style={{ marginBottom: '15px' }}>
            <button type="button" className="voice-btn" style={{ padding: '8px 12px', background: '#f1f2f6', border: '1px dashed #ccc', borderRadius: '4px', cursor: 'pointer', textAlign: 'left', width: 'fit-content' }}>
              🎙️ Summarize from Voice Note (Requires Consent)
            </button>
          </div>

          <div className="group sentiment-group">
            <label>Observed/Inferred HCP Sentiment</label>
            <div className="radios">
              {['Positive', 'Neutral', 'Negative'].map((s) => (
                <label key={s}>
                  <input type="radio" name="sentiment" value={s} checked={formData.sentiment === s} onChange={() => handleInputChange('sentiment', s)} /> {s}
                </label>
              ))}
            </div>
          </div>

          <div className="group">
            <label>Outcomes</label>
            <textarea value={formData.outcomes} onChange={(e) => handleInputChange('outcomes', e.target.value)} placeholder="Key outcomes..."></textarea>
          </div>

          <div className="group">
            <label>Follow-up Actions</label>
            <textarea value={formData.follow_up_actions} onChange={(e) => handleInputChange('follow_up_actions', e.target.value)} placeholder="Enter next steps..."></textarea>
          </div>

          <button type="submit" className="submit-btn">Log Interaction to DB</button>
        </form>

        {/* Right Side: AI Assistant Chat Interface  */}
        <div className="chat-panel">
          <h3>AI Assistant</h3>
          <div className="chat-box">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-input-row">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Describe interaction..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Enter dabane par page reload na ho
                  handleChatSend();
                }
              }}
            />
            <button type="button" onClick={handleChatSend}>Ask / Log</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;