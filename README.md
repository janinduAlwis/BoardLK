# BoardLK 🏠

> A modern cross-platform mobile application simplifying boarding and accommodation discovery for university students and young professionals across Sri Lanka.

[![React Native](https://img.shields.io/badge/React_Native-0.86.3-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-v57-000000?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/State-Zustand_5-433e38)](https://zustand-demo.pmnd.rs/)

---

## 📖 Overview

Finding safe, affordable, and accessible boarding accommodations (annexes, single rooms, apartments) in Sri Lanka is often fragmented across social media groups, classified ads, and physical notice boards. **BoardLK** centralizes and modernizes the search process with an interactive map, real-time pricing markers, localized amenity filters, and direct tenant-to-landlord communication.

---

## ✨ Features

- 🗺️ **Interactive Map Search:** Powered by `react-native-maps` with custom price badges and smooth spring-animated property preview cards.
- 🎚️ **Custom Touch-Driven Range Slider:** Engineered using native `PanResponder` API for precise, performant 60fps budget filtering.
- 🔍 **Multi-Criteria Filtering:** Filter by accommodation types (Rooms, Annexes, Apartments) and preferences (Attached Bathroom, Girls Only, Boys Only).
- 💬 **Context-Aware In-App Messaging:** Direct chat with property owners featuring embedded listing details at the top of the conversation.
- ⭐ **Community Ratings & Reviews:** Interactive star-rating and review submission system to build landlord-tenant transparency.
- 💖 **Favorites & Saved Listings:** Instant bookmarking for comparing accommodations offline or on the go.
- 📱 **Universal Cross-Platform:** Built with Expo Router supporting iOS, Android, and Web platforms.

---

## 🛠️ Tech Stack

- **Core Framework:** [React Native](https://reactnative.dev/) 0.86.3, [React 19](https://react.dev/)
- **Development Tooling:** [Expo](https://expo.dev/) SDK 57
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based Routing, Typed Routes)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Maps & Geolocation:** [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- **Animations & Gestures:** `react-native-reanimated`, `react-native-gesture-handler`, Native `PanResponder`
- **Icons:** `@expo/vector-icons` (Feather, FontAwesome, Ionicons)

---

## 📂 Project Structure

```
BoardLK/
├── src/
│   ├── app/                 # Expo Router file-based pages
│   │   ├── (tabs)/          # Bottom tab navigation (Home, Map, Favorites, Profile, Chat)
│   │   ├── chat/[id].tsx    # Context-aware chat with property owner
│   │   ├── property/[id].tsx# Detailed property view & amenity badges
│   │   ├── filters.tsx      # Modal filter sheet with custom range slider
│   │   ├── review.tsx       # Star rating and review submission modal
│   │   ├── login.tsx        # User authentication screen
│   │   └── _layout.tsx      # Root stack navigation layout
│   ├── components/          # Reusable UI components
│   │   ├── RangeSlider.tsx  # Dual-thumb PanResponder range slider
│   │   ├── PropertyCard.tsx # Listing card component
│   │   ├── SearchBar.tsx    # Search input with filter action
│   │   └── FilterPills.tsx  # Horizontal category filter selector
│   ├── constants/           # Mock properties and theme definitions
│   ├── hooks/               # Custom platform and color-scheme hooks
│   └── store/               # Global state management via Zustand
├── assets/                  # App icons, splash screens, and mock images
├── app.json                 # Expo project configuration
└── package.json             # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Expo Go](https://expo.dev/go) app on your mobile device (iOS / Android) or an emulator.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/BoardLK.git
   cd BoardLK
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on a device / emulator:**
   - Scan the QR code with **Expo Go** (Android) or the **Camera app** (iOS).
   - Press `a` in the terminal to launch on an Android emulator.
   - Press `i` to launch on an iOS simulator.
   - Press `w` to launch in the web browser.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
