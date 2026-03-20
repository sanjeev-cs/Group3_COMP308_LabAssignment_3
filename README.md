# Game Progress Platform

This project is a federated React/Vite frontend with GraphQL microservices for authentication and game progress tracking.

## Services

### Backend

- Auth service: `http://localhost:4001/graphql`
- Game progress service: `http://localhost:4002/graphql`

### Frontend

- Host shell: `http://localhost:5173`
- Auth remote: `http://localhost:5174`
- Progress remote: `http://localhost:5175`

## Setup

### Backend

Use [`backend/.env.example`](/C:/Users/sanje/Documents/Centennial/SEM_4/COMP308_Emerging_Technologies/Lab_Assignments/Lab_Assignment-3/Group3_COMP308_LabAssignment_3/backend/.env.example) as the template.

Install and run:

```bash
cd backend
npm install
npm run dev
```

### Frontend

Use [`frontend/.env.example`](/C:/Users/sanje/Documents/Centennial/SEM_4/COMP308_Emerging_Technologies/Lab_Assignments/Lab_Assignment-3/Group3_COMP308_LabAssignment_3/frontend/.env.example) as the template.

Install and run:

```bash
cd frontend
npm install
npm run dev
```

## Flow

- Login or register through the auth remote
- Player accounts open the player panel
- Admin accounts open the admin panel
- Three.js visuals are used in the dashboard experience
