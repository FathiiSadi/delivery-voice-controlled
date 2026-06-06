# Snoonu Voice-Controlled

A Snoonu-style food delivery app with **Nunu**, a voice assistant. Just talk,
say *"I want a burger"* and the assistant finds restaurants, shows menus, and
builds your order for you. Works in **English and Arabic**.

Built with **React 19**, the browser **Web Speech API** (voice in/out),
and an **LLM** (Groq / LLaMA) that turns what you say into actions.

## Get the project

```bash
git clone https://github.com/FathiiSadi/delivery-voice-controlled.git
cd snoonu-voice-controlled
```

## Install

```bash
npm install
```

## Add API key

Nunu needs a Groq API key to understand you. It's free.

1. Get a key at https://console.groq.com
2. Make a `.env` file (copy from the example):

   ```bash
   cp .env.example .env
   ```

3. Open .env file and paste your key:

   ```
   VITE_GROQ_API_KEY= your new key
   ```

## Run it

```bash
npm run dev
```

Then open the link it prints.
Click the **mic button** in the corner and start talking.


## Other commands

```bash
npm run build     # build for production
npm run preview   # preview the production build
npm run lint      # check code style
```

## Push your own changes

```bash
git add .
git commit -m "your message"
git push
```
