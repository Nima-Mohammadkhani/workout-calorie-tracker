<div align="center">

# 💪 Workout Calorie Tracker 💪

### *Track your workouts, monitor calories burned, and achieve your fitness goals*

[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-000020.svg?style=for-the-badge&logo=expo)](https://expo.dev/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC.svg?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.2-06B6D4.svg?style=for-the-badge&logo=tailwindcss)](https://www.nativewind.dev/)
[![JSON Server](https://img.shields.io/badge/JSON%20Server-FF6B6B.svg?style=for-the-badge&logo=json)](https://github.com/typicode/json-server)

---

</div>

## Features

**Workout Management**
- Browse comprehensive workout library with detailed exercises
- Multiple difficulty levels (Easy, Medium, Hard) for each workout
- Real-time workout timer with countdown functionality
- Rest timer between sets for optimal recovery
- Workout progress tracking with completion status
- Visual progress indicators and circular progress bars

**Calorie & Time Tracking**
- Automatic calorie calculation based on workout intensity
- Total time tracking for completed workouts
- Real-time statistics display (calories burned, time spent)
- Progress comparison (completed vs. total goals)
- Workout duration calculation per exercise

**User Experience**
- Beautiful and modern UI with smooth animations
- Skeleton loading states for better UX
- Animated score display with smooth transitions
- Toast notifications for user feedback
- RTL (Right-to-Left) support for Persian language
- Error boundary handling for robust error management

**Navigation & Tabs**
- Home screen with workout list and statistics
- Exercise detail page with interactive workout interface
- Shop tab (Coming Soon)
- Chat & Support tab (Coming Soon)
- Calendar & Planning tab (Coming Soon)
- Profile tab (Coming Soon)

**State Management**
- Redux Toolkit for centralized state management
- Async thunks for API calls
- Persistent workout progress tracking
- Real-time state updates during workouts

## Tech Stack

<div align="center">

![React Native](https://img.shields.io/badge/-React_Native_0.81-61DAFB?style=flat-square&logo=react&logoColor=white)
![React](https://img.shields.io/badge/-React_19.1-61DAFB?style=flat-square&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/-Expo_54-000020?style=flat-square&logo=expo&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![React Redux](https://img.shields.io/badge/-React_Redux-764ABC?style=flat-square&logo=redux&logoColor=white)

![NativeWind](https://img.shields.io/badge/-NativeWind_4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript_5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Expo Router](https://img.shields.io/badge/-Expo_Router_6.0-000020?style=flat-square&logo=expo&logoColor=white)
![React Native Reanimated](https://img.shields.io/badge/-Reanimated_4.1-61DAFB?style=flat-square&logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios_1.12-5A29E4?style=flat-square&logo=axios&logoColor=white)
![JSON Server](https://img.shields.io/badge/-JSON_Server-FF6B6B?style=flat-square&logo=json&logoColor=white)
![Toast Message](https://img.shields.io/badge/-Toast_Message-00D084?style=flat-square&logo=react&logoColor=white)

</div>

## Project Structure

```
workout-calorie-tracker/
├── app/
│   ├── _layout.tsx                 # Root layout + Redux Provider + Error Boundary
│   ├── (tabs)/
│   │   ├── _layout.tsx             # Tab navigator configuration
│   │   ├── index.tsx               # Home screen with workout list
│   │   ├── exercise/
│   │   │   └── [id].tsx           # Exercise detail page with timer
│   │   ├── shop.tsx                # Shop tab (Coming Soon)
│   │   ├── chat.tsx                # Chat tab (Coming Soon)
│   │   ├── calendar.tsx            # Calendar tab (Coming Soon)
│   │   └── profile.tsx             # Profile tab (Coming Soon)
│   └── +not-found.tsx              # 404 page
├── components/
│   ├── AnimatedScore.tsx           # Animated user score component
│   ├── Skeleton.tsx                # Skeleton loading components
│   ├── SkeletonShowcase.tsx        # Skeleton demo
│   ├── ComingSoon.tsx              # Coming soon placeholder component
│   └── ui/
│       ├── Button.tsx              # Reusable button component
│       ├── Input.tsx               # Reusable input component
│       ├── Icon.tsx                # Icon wrapper component
│       └── errorCallBack.tsx      # Error boundary fallback
├── redux/
│   ├── instance.ts                 # Axios instance configuration
│   ├── store.ts                    # Redux store configuration
│   ├── slice/
│   │   └── exerciseSlice.ts        # Exercise state management
│   └── service/
│       └── exercise.ts              # Exercise API service
├── utils/
│   ├── workoutCalculations.ts      # Calorie & time calculation utilities
│   └── delay.ts                    # Delay utility for loading states
├── types/
│   └── ui.ts                       # TypeScript type definitions
├── data/
│   ├── workouts.json                # Workout data (JSON)
│   └── workouts.ts                  # Workout data (TypeScript)
├── constants/
│   └── theme.ts                    # Theme constants
├── hooks/
│   ├── use-color-scheme.ts         # Color scheme hook
│   ├── use-color-scheme.web.ts     # Web color scheme hook
│   └── use-theme-color.ts           # Theme color hook
├── assets/
│   ├── images/                     # App images and icons
│   └── fonts/                      # Custom fonts
└── global.css                      # Global styles (NativeWind)
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- Expo CLI (installed globally or via npx)
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

### Installation

```bash
# Install dependencies
pnpm install
# or
yarn install
# or
npm install
```

### Development

```bash
# Start development server
npx expo start

# Platform specific
npx expo start --android    # Android
npx expo start --ios        # iOS  
npx expo start --web        # Web
```

### Production Preview

```bash
# Test production build
npx expo start --no-dev --minify
```

## Build with EAS

### 1. Configure app.json

```json
{
  "expo": {
    "name": "Workout Calorie Tracker",
    "slug": "workout-calorie-tracker",
    "version": "1.0.0",
    "android": { 
      "package": "com.yourcompany.workouttracker" 
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.workouttracker"
    }
  }
}
```

### 2. Setup eas.json

```json
{
  "cli": { "version": ">= 3.0.0" },
  "build": {
    "apk": { 
      "android": { "buildType": "apk" } 
    },
    "production": { 
      "android": { "gradleCommand": ":app:bundleRelease" } 
    }
  }
}
```

### Build Commands

```bash
# Login to EAS
npx eas login

# Build APK for direct download
npx eas build -p android --profile apk

# Build AAB for Play Store
npx eas build -p android --profile production

# Build for iOS App Store (requires Apple Developer account)
npx eas build -p ios --profile production
```

## Implementation Notes

**Workout System**
- Workouts fetched from API endpoint (`/workouts`)
- Each workout supports three difficulty levels (easy, medium, hard)
- Workout data includes sets, reps, rest time, and calorie estimates
- Real-time timer with pause/resume functionality
- Automatic progress tracking when workouts are completed

**State Management**
- Redux Toolkit for centralized state management
- Async thunks for API calls with loading states
- Workout progress stored in Redux state
- User score and statistics calculated dynamically

**Calorie Calculation**
- Calories calculated based on workout duration and intensity
- Supports both time-based (e.g., "30 seconds") and rep-based exercises
- Total calories aggregated across all completed workouts
- Real-time calorie updates during workout sessions

**Timer System**
- Countdown timer before workout starts (3 seconds)
- Exercise timer with circular progress indicator
- Rest timer between sets with automatic progression
- Pause/resume functionality for flexible workout control

**UI/UX Features**
- Skeleton loading states for smooth loading experience
- Animated score display with number transitions
- Toast notifications for user feedback
- Error boundaries for graceful error handling
- RTL layout support for Persian language

**API Integration**
- JSON Server for mock REST API during development
- Axios instance configured with base URL
- RESTful API endpoints for workout data
- Error handling with user-friendly messages
- Loading states managed through Redux

## Available Scripts

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios", 
    "web": "expo start --web",
    "lint": "expo lint",
    "reset-project": "node ./scripts/reset-project.js"
  }
}
```

## API Configuration

The app uses JSON Server for the backend API. The API instance is configured in `redux/instance.ts`. Update the base URL according to your backend:

```typescript
const instance = axios.create({
  baseURL: "http://your-api-url:port",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
```

### Running JSON Server

To start the JSON Server for development:

```bash
# Install JSON Server globally (if not already installed)
npm install -g json-server

# Start JSON Server with your data file
json-server --watch data/workouts.json --port 3001

# Or use a custom port
json-server --watch data/workouts.json --port 3001 --host 0.0.0.0
```

### API Endpoints

- `GET /workouts` - Fetch all workouts
- `GET /workouts/:id` - Fetch workout by ID

## Key Components

**AnimatedScore**
- Displays user score with smooth number animations
- Loading state support
- Customizable styling

**Skeleton**
- Multiple skeleton variants for different screens
- Index page skeleton
- Score skeleton
- Exercise detail skeleton

**ComingSoon**
- Placeholder component for upcoming features
- Customizable colors and icons
- Feature list display

## Development Tips

1. **Hot Reload**: Changes are automatically reflected during development
2. **TypeScript**: Full TypeScript support for type safety
3. **Error Handling**: Use error boundaries for robust error management
4. **State Updates**: Use Redux DevTools for debugging state changes
5. **Styling**: Use NativeWind (Tailwind CSS) for consistent styling

## Future Features

- Shop integration for fitness equipment
- Chat and support system
- Calendar and workout planning
- User profile and statistics
- Social features and sharing
- Workout history and analytics
- Custom workout creation
- Integration with fitness wearables

## License

This project is for educational and demo purposes only. For commercial use, configure identifiers and service keys according to your organization.

---
