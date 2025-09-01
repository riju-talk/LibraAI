# Quick Start Guide

## Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher
- Git

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/riju-talk/LibraAI.git
   cd LibraAI
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_API_BASE_URL=your_api_url_here
   VITE_APP_NAME=LibraAI
   VITE_APP_ENV=development
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## First Steps

1. **Sign Up/Log In**
   - Create a new account or log in with existing credentials
   - Complete your profile setup

2. **Explore the Dashboard**
   - Navigate through different sections
   - Customize your workspace

3. **Upload Your First Document**
   - Click on "New Document"
   - Select or drag-and-drop your legal document
   - Wait for analysis to complete

4. **Ask a Legal Question**
   - Use the chat interface to ask legal questions
   - Review the AI-generated responses and references

## Troubleshooting

- **Installation Issues**
  - Clear npm cache: `npm cache clean --force`
  - Delete `node_modules` and run `npm install` again

- **Runtime Errors**
  - Check browser console for error messages
  - Ensure all environment variables are properly set

## Next Steps
- Explore advanced features in the Features section
- Learn about API integration in the API Documentation
- Check out our example workflows for common legal tasks
