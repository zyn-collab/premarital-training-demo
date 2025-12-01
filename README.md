# Premarital Course App Demo

A interactive premarital training course application designed for state premarital training programs. This demo showcases how couples can work through essential life planning decisions together.

## Features

- **20 Interactive Slides**: Including title slides, video content, educational content, practice questions, and decision checkpoints
- **8 Decision Checkpoints**: Validates that both partners' answers match before allowing progression
- **Progress Tracking**: Uses localStorage to save progress - users can close and return later
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- **Demo Mode**: Optimized timing for client presentations (4-second content slides, 10-second video playback)
- **Info Modal**: Built-in guide with demo answers for testing

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS v3** - Styling
- **localStorage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd premarital-course-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the local URL shown (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Deploying to Vercel

This project is configured for Vercel deployment:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the configuration from `vercel.json`
4. Deploy!

Alternatively, use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

## Using the Demo

### Opening the Info Modal

Click the "📖 Info about model + demo answers to use" link at the top of the page to see:
- How the real app works vs the demo
- All the correct answers for testing
- Demo tips and timing information

### Demo Answers

The demo simulates Partner A's answers. Use these to test the matching feature:

- **Decision 1**: Yes, we want children (number flexible)
- **Decision 2**: Wait 1 year to strengthen relationship
- **Decision 3**: Hybrid: Joint for household + separate personal
  - Text: `We will maintain a hybrid system with joint household account and separate personal accounts, with monthly budget reviews.`
- **Decision 4**: Independently (our own place)
- **Decision 5**: Both will work outside home
- **Decision 6**: Each handles their own family's issues
  - Text: `We agree that each partner will handle issues with their own family first, and only involve the spouse when necessary for support.`
- **Decision 7**: All major decisions made jointly (must both agree)
- **Decision 8**: We'll follow Islamic guidance and decide together

### Demo Tips

- Try wrong answers first to show validation errors
- Then use correct answers to show the success flow
- Content slides auto-advance after 4 seconds
- Video slides play for 10 seconds
- Use "Reset Demo" button in bottom right to clear all progress

## Project Structure

```
premarital-course-app/
├── src/
│   ├── components/
│   │   ├── slides/
│   │   │   ├── TitleSlide.jsx
│   │   │   ├── VideoSlide.jsx
│   │   │   ├── ContentSlide.jsx
│   │   │   ├── PracticeSlide.jsx
│   │   │   ├── TransitionSlide.jsx
│   │   │   ├── CheckpointSlide.jsx
│   │   │   ├── SummarySlide.jsx
│   │   │   └── CompletionSlide.jsx
│   │   ├── InfoModal.jsx
│   │   ├── Navigation.jsx
│   │   ├── ProgressBar.jsx
│   │   └── SlideRenderer.jsx
│   ├── data/
│   │   └── courseData.json
│   ├── utils/
│   │   └── localStorage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── DEMO_ANSWERS.txt
├── vercel.json
└── package.json
```

## How It Works

### Real App (Full Version)
1. Both partners access the course independently on their own devices
2. Each partner submits their answers without seeing the other's responses
3. Answers are stored in a database
4. The system compares both answers when both have submitted
5. Partners can only proceed when answers match
6. Partners can go back and change answers until they reach agreement

### Demo Version
- Simulates Partner A's answer with predefined "correct" answers
- When you submit, it validates against these simulated partner answers
- Demonstrates the validation logic without requiring a backend

## Development Notes

- Progress is saved to localStorage on every slide change
- The "Reset Demo" button clears all localStorage data
- Each slide type has specific behavior (timers, validation, etc.)
- The app uses React's key prop to force component remounts between slides
- Tailwind CSS provides responsive styling throughout

## Support

For issues or questions, please open an issue in the GitHub repository.

## License

[Add your license here]
