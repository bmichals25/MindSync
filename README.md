# MindSync Therapy App

MindSync is a mobile application designed to provide on-demand AI-assisted therapy and mental wellness support. It offers users a safe space to express their thoughts, track their emotional well-being, and develop coping strategies for everyday challenges.

## Features

- **AI Therapy Conversations**: On-demand text or voice conversations with an AI therapist
- **Mood Tracking**: Monitor emotional states before and after therapy sessions
- **Session Recaps**: Summaries with key insights and actionable steps
- **Customizable Experience**: Preferences for AI model, theme, and more

## Screenshots

*Screenshots will be added here once the app is more complete*

## Tech Stack

- **Frontend**: React Native with Expo
- **State Management**: Redux Toolkit with Redux Persist
- **Navigation**: React Navigation v6
- **UI Components**: Custom components with React Native Paper
- **API Integration**: Axios for HTTP requests
- **AI Integration**: OpenAI API (modular design for adding other AI providers)
- **Voice Integration**: ElevenLabs API for text-to-speech

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional for mobile testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mindsync.git
   cd mindsync
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

5. Follow the instructions in the terminal to open the app on your preferred platform (iOS, Android, or web).

## Project Structure

```
src/
├── api/                  # API integration
├── assets/               # Static assets
├── components/           # Reusable UI components
│   ├── common/           # Generic components
│   ├── chat/             # Chat-specific components 
│   ├── mood/             # Mood tracking components
│   └── session/          # Session-related components
├── constants/            # App constants
├── hooks/                # Custom React hooks
├── navigation/           # Navigation configuration
├── screens/              # App screens
├── store/                # Redux store configuration
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Roadmap

- [ ] Complete initial UI implementation
- [ ] Add authentication and user accounts
- [ ] Implement OpenAI API integration
- [ ] Add ElevenLabs voice integration
- [ ] Implement persistent storage
- [ ] Add mood analytics and insights
- [ ] Support for multiple AI providers
- [ ] Add offline mode

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OpenAI](https://openai.com/) for AI capabilities
- [ElevenLabs](https://elevenlabs.io/) for voice synthesis
- [Expo](https://expo.dev/) for the development platform
- [React Native](https://reactnative.dev/) for the mobile framework 