# Cashyo - Digital Wallet System

Cashyo is a modern, secure, and user-friendly digital wallet system. It provides a seamless way to manage your finances, send and receive money, and handle various financial transactions with ease.

**Live URL:** [https://cashyo.vercel.app/](https://cashyo.vercel.app/)

## Project Overview

This project is the frontend for the Cashyo digital wallet system. It is built with a modern technology stack to provide a fast, responsive, and intuitive user experience. The application is designed to be a single-page application (SPA) with a focus on performance and usability.

## Technology Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with shadcn/ui components
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Form Management:** React Hook Form with Zod for validation
- **Linting:** ESLint
- **Deployment:** Vercel

## Setup Instructions

To get the project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jakariyaa/cashyo.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd cashyo
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  **Open your browser** and navigate to `http://localhost:5173` (or the port specified in the console).

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase for errors.
- `npm run preview`: Serves the production build locally for preview.
- `npm run deploy`: Builds the application and deploys it to Vercel.

## Project Structure

The project is structured as follows:

```
.
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── common
│   │   ├── layout
│   │   └── ui
│   ├── context
│   ├── hooks
│   ├── lib
│   ├── pages
│   │   ├── auth
│   │   └── dashboard
│   ├── providers
│   ├── redux
│   │   ├── features
│   │   └── store.ts
│   ├── routes
│   ├── types
│   └── utils
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.ts
```

- **`src/components`**: Contains reusable UI components.
- **`src/pages`**: Contains the main pages of the application.
- **`src/redux`**: Contains the Redux store and slices.
- **`src/routes`**: Contains the application's routing configuration.
- **`src/lib`**: Contains utility functions.
- **`src/hooks`**: Contains custom React hooks.
- **`src/providers`**: Contains context providers.
- **`src/types`**: Contains TypeScript type definitions.
- **`src/utils`**: Contains miscellaneous utility functions.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
