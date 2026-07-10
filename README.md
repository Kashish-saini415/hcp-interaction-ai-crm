# 🎓 hcp-interaction-ai-crm

Your intelligent AI-powered CRM assistant — built for pharmaceutical and life sciences field reps, automatically parses conversation summaries, and seamlessly populates structured medical CRM fields!

🚀 **Next-Gen Pharma CRM Automation Layer**

---

## ✨ What is hcp-interaction-ai-crm?

hcp-interaction-ai-crm is a smart automation layer designed specifically for healthcare relationship management. Unlike manual entry database workflows, this intelligent integration:

* 💬 **AI Assistant Panel** — Processes raw natural language notes right inside a sidebar panel.
* 📋 **Smart Field Autofill** — Instantly parses critical clinical meeting variables from unstructured chats.
* 🔄 **State Synchronization** — Direct-injects validated JSON trees into complex UI forms.
* 🔒 **Secure-by-Design** — Uses strict environmental variable mapping to safely keep all keys off public trees.

---

## 📺 Screenshots

### CRM Analytics & Intake View
* Dark-themed modern analytical enterprise layout.
* Floating real-time asynchronous chat panel context.
* Intuitive synchronization button layouts.

### AI Processing Core
* Structured medical data visualization.
* Direct feedback state updates.
* Instant dynamic schema mapping.

---

## 🚀 Features

| Feature | Description |
| :--- | :--- |
| 💬 Real-Time Chat | Send unstructured textual input logs directly to the parsing stream |
| 🧬 Field Extraction | Pulls HCP names, metrics, specific medical terms, and calendar dates |
| 🧠 Sentiment Analysis | Automatically reviews and flags client sentiment profiles from raw logs |
| ⚡ Redux Form Sync | Bypasses slow UI re-renders to instantly map parsed JSON arrays to state |
| 🗃️ Relational DB Sync | Commits every confirmed interaction straight into a backend SQLite instance |

---

## 🛠️ Tech Stack

| Tool | Purpose |
| :--- | :--- |
| Python | Core backend programming language ecosystem |
| FastAPI | Ultra-fast asynchronous REST framework infrastructure |
| React.js | Modular, component-driven responsive user interface |
| Redux Toolkit | Predictable, centralized application state management store |
| Groq Cloud API | Supercharges local inference layers with Llama 3.3 (70B) |
| SQLAlchemy | Robust Python SQL toolkit and Object Relational Mapper |
| SQLite | Lightweight, localized relational development storage |

---

## ⚙️ Setup & Installation

### Prerequisites
* Python 3.10+
* Node.js (v18+)
* Free Groq API key from console.groq.com

### 1. Clone the Repository
```bash
git clone [https://github.com/Kashish-saini415/hcp-interaction-ai-crm.git](https://github.com/Kashish-saini415/hcp-interaction-ai-crm.git)
cd hcp-interaction-ai-crm
```

### 2. Configure Backend & Dependencies
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure API Keys
Create a `.env` file inside the `backend/` folder:
```bash
GROQ_API_KEY=your_actual_groq_api_key_here
```

### 4. Start the Backend Server
```bash
python -m uvicorn main:app --reload
```
Backend will run at: `http://127.0.0.1:8000`

### 5. Open and Run Frontend
Open a new terminal window, navigate to the frontend directory, and launch Vite:

```Bash
cd frontend
npm install
npm run dev
```
Open `frontend/login.html` in your browser — and you're good to go! 🎉

---

## 📁 Project Structure

```
hcp-interaction-ai-crm/
├── backend/
│   ├── main.py            # FastAPI endpoints, system prompts & inference setup
│   ├── requirements.txt   # Python system dependencies 
│   ├── crm.db             # Local running SQLite database instances
│   └── .env               # API keys (strictly hidden from version control)
├── frontend/
│   ├── src/
│   │   ├── store/         # State slice actions and Redux store configurations
│   │   ├── App.jsx        # Primary CRM dashboard interface components
│   │   └── main.jsx       # Render trees and global configurations
│   ├── package.json       # Node package asset and script files
│   └── vite.config.js     # Build automation asset bundling tools
└── .gitignore             # Strict standard exclusion rules mapping

```

---

## ⚠️ Important

Never push your `.env` file to GitHub. It contains your API key. The `.gitignore` already handles this.

---

## 👩‍💻 Author

**Kashish Saini**
GitHub: [@Kashish-saini415](https://github.com/Kashish-saini415)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

