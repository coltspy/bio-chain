# Bio-Chain Biospecimen Management Demo

Welcome to the **Bio-Chain Demo**, a Next.js + React application showcasing how biological samples (biospecimens) could be managed on a transparent platform. This educational demonstration illustrates the core UI/UX flows for both sample providers and researchers.


## Features

- **Sample Provider Portal**
  - Track biological samples
  - Manage consent preferences
  - Simulated benefits distribution dashboard

- **Researcher Portal**
  - Natural language specimen search (pattern-match demo)
  - Interactive project dashboard with visualizations
  - Manage and organize multiple research initiatives

- **Shared Components**
  - Responsive, mobile-friendly layout
  - Tailwind CSS–powered design system
  - Semantic, accessible HTML structure

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router / `use client`)  
- [React](https://reactjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- SVG icons for illustrative UI elements

## Getting Started

### Prerequisites

- **Node.js** v16 or higher  
- **npm** (v8+) or **yarn**  

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/coltspy/bio-chain.git
   cd bio-chain
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Demo

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the application.

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

The app will be served at `http://localhost:3000`.

## Demo Portals

- **Sample Provider Portal** (`/contributor`):  
  View and track your sample inventory, simulate consent controls, and see how benefits might be distributed back to providers.

- **Researcher Portal** (`/researcher`):  
  Search for specimens using everyday language, explore mock data visualizations, and manage research projects—all powered by a pattern-matching demo.

## Technical Notes

- The **semantic search** feature is simulated via client-side pattern matching to demonstrate potential UX; no backend or real data connection is used.
- Sample data and dashboards are **mocked** for educational purposes—no PHI or real biospecimens are involved.
- Tailwind CSS utilities power the responsive design and theming.

