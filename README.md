# Pear Media AI Prototype

Welcome to the **Pear Media AI Prototype** – a next-generation creative workflow application that bridges the gap between simple user inputs and advanced AI outputs. This project was built to satisfy the Pear Media Assignment requirements with a "Clean Tech" aesthetic, robust error handling, and multimodal AI capabilities.

## 🚀 Features

### **Workflow A (Creative Studio)**
An intelligent text-to-image pipeline:
1. **Input:** The user provides a simple concept (e.g., "A futuristic city").
2. **Enhancement:** Powered by an LLM (e.g., OpenAI `gpt-4o-mini`), the prompt is transformed into a descriptive masterpiece including lighting, camera angles, and artistic style.
3. **Human-in-the-Loop:** The user reviews and edits the enhanced prompt before approving it.
4. **Generation:** Connects to an Image AI (e.g., OpenAI DALL-E 3) to render the final asset in breathtaking quality.

### **Workflow B (Style Lab)**
A visual reverse-engineering pipeline:
1. **Upload:** Users upload a local image (parsed securely via `FileReader` to Base64).
2. **Analysis:** The image is sent to a Vision AI (e.g., `gpt-4o-mini`) to extract its main subjects, color palette, lighting, and artistic style.
3. **Transformation:** The analysis automatically serves as a new prompt to generate a stunning, stylistically similar variation.

### **UI & UX Highlights**
- **Clean Tech Aesthetic:** Crafted using Tailwind CSS v4, featuring glassmorphism elements, vibrant indigo/violet gradients, rounded corners, and generous whitespace.
- **Global Loading State:** Unified overlay with micro-animations prevents double-submissions during long-running AI API calls.
- **Responsive Layout:** A two-pane tabbed structure that excels on desktop and degrades gracefully on mobile.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 (via Vite for lightning-fast HMR and building)
- **Styling:** Tailwind CSS v4 & Lucide React (Icons)
- **API Integration:** Axios
- **AI Models Supported:** OpenAI (GPT-4o-mini, DALL-E 3)

## 💻 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/namepearmedia/pearmedia-ai-prototype.git
cd pearmedia-ai-prototype
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your API keys:
```env
REACT_APP_GROQ_KEY=gsk_your_groq_api_key_here
VITE_HF_TOKEN=hf_your_free_huggingface_token
```
*(Note: Because this is a Vite project, keys must be prefixed with `VITE_` or `REACT_APP_` depending on configuration. We've configured both to work!)*

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## 📂 Project Structure

```
pearmedia-ai-prototype/
├── .env                    # Secret API Keys (Not tracked in git)
├── .gitignore              # Files to ignore
├── README.md               # Detailed project documentation
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind configurations
├── vite.config.js          # Vite configurations
└── src/
    ├── App.jsx             # State management & Main Layout
    ├── index.css           # Custom styles and Tailwind base
    ├── main.jsx            # Entry point
    ├── components/
    │   ├── Navbar.jsx      # Navigation and Logo
    │   ├── WorkflowText.jsx# Input, Enhance, Approve, Generate logic
    │   ├── WorkflowImage.jsx# Upload, Analyze, Variation logic
    │   └── ImageCard.jsx   # Reusable component to display AI images
    └── utils/
        ├── apiHelpers.js   # All fetch()/axios logic organized by API
        └── constants.js    # Default model configs & configuration
```
