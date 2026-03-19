# Bandejo - Blueprint

## Overview

Bandejo is a web application designed to simplify university life for students. It provides quick access to essential daily information. The application is built with Next.js and features a modern, responsive, and accessible design.

## Project Outline

### Core Technologies

*   **Framework:** Next.js (with App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Authentication:** Firebase Authentication (Google Provider)

### Design and Styling

*   **Overall Aesthetic:** Modern, clean, and dark-themed, with a focus on usability and visual appeal.
*   **Color Palette:** A base of dark grays (`gray-800`, `gray-900`) with vibrant accents of indigo (`indigo-500`, `indigo-400`). White and light grays (`gray-300`) are used for text and highlights.
*   **Typography:** The `Inter` font is used for its clean and modern look. Font sizes are used to create a clear visual hierarchy.
*   **Visual Effects:**
    *   **Subtle Texture:** A `noise-texture.png` is used as a background overlay to add a premium, tactile feel.
    *   **Shadows:** `shadow-lg` is used to create a sense of depth and lift for cards and other elements.
    *   **Transitions and Animations:** Hover effects (e.g., `transform`, `scale-105`, `transition-colors`) are used to provide visual feedback and create a more interactive experience.

### Features

*   **Login Page (`/`):**
    *   The application starts with a conditional rendering logic in the main `page.tsx`.
    *   If the user is not logged in, a full-screen `LoginForm` component is displayed.
    *   The login form provides a Google login option using Firebase Authentication.
    *   Upon successful login, the state changes, and the `HomeScreen` is rendered.
*   **Home Screen:**
    *   Displayed after the user logs in.
    *   A hero section with a prominent welcome message.
    *   A section displaying two "Card" components side-by-side, each with an emoji and a title.

## Current Task: Implement Firebase Google Login

### Plan

1.  **Configure Firebase:** Set up a `firebase.tsx` library file with Firebase configuration and a `signInWithGoogle` function.
2.  **Update Login Form:** Modify `LoginForm.tsx` to call the `signInWithGoogle` function on button click.
3.  **Install Dependencies:** Add the `firebase` package to the project.
4.  **Update Blueprint:** Document the changes in the `blueprint.md` file.

## Development Log

1.  **Project Scaffolding:** Initialized a new Next.js project with the App Router.
2.  **Login Page:**
    *   Created a `LoginForm.tsx` component with a modern design, including input fields and buttons.
    *   Implemented client-side logic to handle the login state.
3.  **Routing & Navigation (Initial):**
    *   Created placeholder pages for `home`, `menu`, and `bus`.
    *   Created a `Navbar.tsx` component.
4.  **Page Designs (Initial):**
    *   Designed the home, menu, and bus pages with placeholder content.
5.  **Blueprint Creation:**
    *   Created this `blueprint.md` file.
6.  **Refactoring and Simplification:**
    *   Removed the `/home`, `/menu`, and `/bus` pages and the `Navbar.tsx` component to simplify the application.
    *   The main `page.tsx` now conditionally renders the `LoginForm` or the `HomeScreen` based on a `isLoggedIn` state.
    *   Created a reusable `Card.tsx` component to display an emoji and a title.
    *   Updated the `HomeScreen` to display two instances of the `Card` component.
7.  **Google-Only Login:**
    *   Simplified the `LoginForm.tsx` component to exclusively feature a Google login button, removing the previous email/password form.
8.  **Firebase Integration:**
    *   Created `src/lib/firebase.tsx` to initialize Firebase and handle Google authentication.
    *   Updated `LoginForm.tsx` to use the `signInWithGoogle` function.
    *   Installed the `firebase` npm package.
