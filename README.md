# Project Management UI - React Frontend

A modern, responsive frontend for the Project Management App built with React, Vite, Tailwind CSS, and Shadcn UI components.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Modern component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling
- **Zustand** - State management
- **Lucide React** - Icon library

---

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Laravel API backend running on `http://127.0.0.1:8000`

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/alaincodes24/project-management-app-frontend.git
cd project-management-app-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Initialize Shadcn UI

```bash
npx shadcn@latest init
```

### 4. Add Required Shadcn Components

```bash
npx shadcn@latest add button card dialog input label textarea
npx shadcn@latest add dropdown-menu avatar badge alert
npx shadcn@latest add table select checkbox switch
npx shadcn@latest add toast tabs sheet sidebar
```

## Development

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

## Features

### Authentication
- Login/Register forms with validation
- Protected routes
- Token-based authentication
- Auto-logout on token expiration

### Project Management
- Create, edit, delete projects
- Project dashboard with statistics
- Project member management
- Project status tracking

### Task Management
- Create, edit, delete tasks
- Task assignment to users
- Task status updates (todo, in-progress, completed)
- Task filtering and sorting
- Drag-and-drop task organization

### User Interface
- Responsive design for all screen sizes
- Dark/light theme toggle
- Modern, clean design with Shadcn UI
- Loading states and error handling
- Toast notifications for user feedback

---

### API Endpoints Used

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /user` - Get current user
- `GET /projects` - Get user projects
- `POST /projects` - Create new project
- `GET /tasks` - Get tasks
- `POST /tasks` - Create new task
- `PATCH /tasks/{id}` - Update task status

---

## Component Library

### Shadcn UI Components Used

- Button, Input, Label, Textarea
- Card, Dialog, Sheet, Tabs
- Table, Select, Checkbox
- Avatar, Badge, Alert
- Toast, Dropdown Menu

---

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interfaces for mobile devices
- Optimized layouts for tablet and desktop

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```