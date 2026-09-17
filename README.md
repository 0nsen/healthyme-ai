# HealthyMe AI

[Link to app](https://healthyme-ai.netlify.app/)

Smart health insight & planner— collects user health data and generates an AI-powered health report (summary, BMI, exercise calendar, nutrition/body/activity breakdown, weight progress, timeline) via the Gemini API, rendered with Ant Design charts and exportable as a PDF.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the env example and add your Gemini API key:
   ```bash
   cp .env.example .env
   ```
   Then set:
   ```
   VITE_GEMINI_API_KEY=your-api-key-here
   ```
   Get a key from [Google AI Studio](https://aistudio.google.com/apikey). The app will fail to generate reports without this.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |
