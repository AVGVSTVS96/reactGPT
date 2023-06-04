# reactGPT
*A React app that has been converted from a plain JS FastAPI version [fastGPT](https://github.com/AVGVSTVS96/FastGPT)*

reactGPT is a high performance, customizable GPT-3.5-turbo and GPT-4 chat application built with FastAPI, React, and OpenAI's API. 

Like it's siblings [fastGPT](https://github.com/AVGVSTVS96/FastGPT) and [flaskGPT](https://github.com/AVGVSTVS96/flaskGPT), reactGPT is simple in code while offering a rich user experience. It's designed to be easy to use, easy to understand, and easy to build on.

This app started as a [Flask](https://github.com/AVGVSTVS96/flaskGPT) app with a plain JavaScript frontend, then evolved to using [FastAPI](https://github.com/AVGVSTVS96/FastGPT) as the backend to take advantage of imporved performance with asynchronous support for OpenAI API requests. 

reactGPT implements several features essential to providing an excellent user experience and offers a simple and concise implementation in code, ready to be built on and expanded.

# Features
- 🤖 Chat with the GPT-3.5 & GPT-4 models
- 🧰 Change system message in realtime from UI
- 📝 Full session conversation history functionality
- 💬 Real-time response character streaming functionality
- 🧩 Markdown support in both user and assistant messages
- 🎨 Syntax highligting for code with automatic language detection
- ⚙️ Automatic scrolling with new messages, cancellable by scrolling up 


# Run Locally
## 1. Clone the project into a directory of your choice
```bash
  git clone https://github.com/AVGVSTVS96/reactGPT
```
## 2. Go to the project directory
```bash
  cd reactGPT
```
## 3. Install frontend dependencies
```bash
  npm install
```
## 4. Start the frontend dev server
*The frontend dev server allows you to make changes to the frontend code and see them in real time*
```bash
  npm run dev
```
## 5. Open a new terminal and go to the server directory 
```bash
$  cd server
```
## 6. Install backend dependencies
```bash
$  pip install -r requirements.txt
```
## 7. Set your OpenAI API key as an environment variable in terminal or in a `.env` file
```bash
$  export OPENAI_API_KEY=<your-API-key>
```
- **(optional) use `.env` file - create a new file in the server directory named `.env`**
```bash
$  touch .env
```
 - **Add your key to the `.env` file**
```env
  OPENAI_API_KEY=<your-API-key>
```

## 8. Start the server the server directory

```bash
$  uvicorn app:app --reload
# Note: remove --reload if you don't need to edit the code
```

# Build the frontend for to optimize performance
*If you don't want to make any changes to the code, replace steps 1-4 with the following to build the frontend for production, optimizing the web page for performance*
## 1. Go to the project directory
```bash
  cd reactGPT
```
## 2. Build the frontend
```bash
  npm run build
```
## 3. Start the frontend server based on the latest build
```bash
  npm run preview
```
