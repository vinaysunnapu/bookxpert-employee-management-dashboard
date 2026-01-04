# BookXpert Employee Management Dashboard

## 📋 Project Overview

BookXpert Employee Management Dashboard is a modern web application designed to help businesses manage their employee records efficiently. The dashboard provides a complete solution for:

- **Employee Management**: Add, edit, delete, and view employee information
- **Search & Filters**: Quickly find employees by name, ID, gender, or active status
- **Pagination**: Browse large employee lists with 10 records per page
- **Authentication**: Secure login system to prevent unauthorized access
- **Print Functionality**: Export and print employee lists
- **Real-time Updates**: All changes are saved to local storage instantly

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2** - Latest React version for building modern, high-performance user interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **Vite** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Lucide React** - Beautiful SVG icons library

### Routing & Navigation
- **React Router v7.11** - Modern client-side routing for seamless multi-page navigation

### State Management
- **React Hooks** - useState, useEffect for component state management
- **Local Storage** - Browser storage for data persistence

### Development Tools
- **ESLint** - Code quality and style enforcement
- **PostCSS** - CSS processing for Tailwind
- **Node.js & npm** - Package management and runtime

---

## 🚀 Steps to Run the Project Locally

### Prerequisites
Make sure you have installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation & Setup

#### 1. Clone or Extract the Project
```bash
# Navigate to the project directory
cd bookxpert-employee-management-dashboard
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start the Development Server
```bash
npm run dev
```

The application will start at: **http://localhost:5173**

#### 4. Build for Production (Optional)
```bash
npm run build
```

### Login Credentials
Use these credentials to log in:
- **Email**: `admin@bookxpert.com`
- **Password**: `admin123`

---

## 🎯 Key Features

### 1. Employee Management
- **Add Employee**: Create new employee records with full details
- **Edit Employee**: Update existing employee information
- **Delete Employee**: Remove employees with confirmation dialog
- **Toggle Status**: Activate/deactivate employees instantly

### 2. Dashboard Overview
- **Statistics Cards**: View total, active, and inactive employee counts
- **Search Bar**: Real-time search by employee name or ID
- **Filter Options**: Filter by gender and employment status
- **Print List**: Export filtered employee data to print

### 3. Data Management
- **Local Storage**: All data persists across sessions
- **Mock Data**: Pre-loaded with sample employees for testing
- **Data Validation**: Form validation for all employee fields

### 4. Navigation & Security
- **Protected Routes**: Dashboard and internal pages require authentication
- **404 Page**: Custom error page for undefined routes
- **Logout**: Secure logout with data persistence

---

## 💡 Assumptions & Design Decisions

### Authentication
- **Local Authentication**: Uses localStorage for authentication (development/demo purposes)
- **No Backend**: Data is stored in browser's local storage, not a backend server
- **Single User**: Designed for single user login (can be extended for multi-user)

### Data Persistence
- **Browser Storage**: Employee data is saved in localStorage
- **Session Based**: Authentication persists across page refreshes
- **Manual Sync**: No real-time sync; data updates are immediate

### UI/UX Decisions
- **Pagination**: 10 records per page for better readability
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark interface with gradient accents
- **Inline Editing**: Edit buttons launch separate form pages (not inline editing)

### Form Validation
- **Client-side Only**: Form validation happens in the browser
- **Required Fields**: Email, password, name, gender, DOB, state are mandatory
- **File Upload**: Profile images must be JPEG/PNG, max 5MB

### Component Structure
- **Reusable Components**: SelectInput, StatCard, Modal components are reusable
- **Type Safety**: Full TypeScript types for all component props
- **Separation of Concerns**: Pages, components, types, and utils are organized separately

### Pagination Logic
- **Auto-adjustment**: When deleting records, page automatically adjusts if needed
- **Filter Reset**: Pagination resets to page 1 when applying filters
- **Empty State**: Shows "No employees found" when no results match filters

### Design Patterns
- **Protected Routes**: Routes wrapped with ProtectedRoute component
- **Custom Hooks**: Reusable React hooks for common logic
- **Props Pattern**: Component communication through props
- **Event Handlers**: Standard React event handling patterns

---

## 📁 Project Structure

```
src/
├── auth/                 # Authentication & routing
│   ├── Login.tsx
│   └── ProtectedRoute.tsx
├── components/          # Reusable UI components
│   ├── EmployeeTable.tsx
│   ├── EmployeeForm.tsx
│   ├── Header.tsx
│   └── ...
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── AddEmployee.tsx
│   └── EditEmployee.tsx
├── types/              # TypeScript type definitions
├── data/               # Mock data and constants
├── utils/              # Utility functions
└── App.tsx            # Main app component
```

---

## 🐛 Known Limitations

- **No Real Backend**: Data is only stored locally in the browser
- **Single User**: Not designed for multi-user scenarios
- **No Database**: No persistent database; data resets when browser storage is cleared
- **No Real Authentication**: Credentials are hardcoded (demo purposes only)
- **Limited Validation**: Client-side validation only

---

## 📝 Future Enhancements

- Backend API integration with a real database
- Multi-user support with proper authentication
- Employee salary/payroll management
- Attendance tracking
- Performance reviews system
- Export to Excel/PDF
- Email notifications
- Dark/Light theme toggle

---

## 📧 Support

For any questions or issues, please refer to the code comments and type definitions included in the project.

---

**Created**: January 2026  
**Version**: 1.0.0
