import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    hcp_name: '',
    interaction_type: 'Meeting',
    date: '2026-04-19',
    time: '19:36',
    attendees: '',
    topics_discussed: '',
    sentiment: 'Neutral',
    outcomes: '',
    follow_up_actions: ''
  },
  chatMessages: [
    { sender: 'ai', text: "Log interaction details here (e.g. 'Met Dr. Smith, discussed Product X efficacy...') or ask for help." }
  ]
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },

    populateForm: (state, action) => {
      const incomingData = action.payload?.data ? action.payload.data : action.payload;

      state.formData = {
        ...state.formData,  
        ...incomingData    
      };
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    clearForm: (state) => {
      state.formData = initialState.formData;
    }
  }
});

export const { updateField, populateForm, addChatMessage, clearForm } = interactionSlice.actions;
export default interactionSlice.reducer;