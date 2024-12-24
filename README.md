# My Netflix Notes

#### Video Demo: https://www.youtube.com/watch?v=QmTllPo04_s

## Project Overview
Netflix Notes is a simple Google Chrome extension that lets you take notes while you watch Netflix. Each note you create includes the show or movie title, a timestamp, the video URL, and your playback position. All notes are connected to your account, so you can always find them later. You can also jump right back to the exact scene where you took the note.

---

## Backend Architecture
The backend is built with **Java** and the **Spring Framework**, following the **Controller-Service-Repository (CSR)** pattern. This pattern helps keep the code organized and easier to maintain. Here’s how it’s structured:

1. **Controller Layer**: Handles incoming HTTP requests.  
2. **Service Layer**: Contains the main business logic and handles data processing.  
3. **Repository Layer**: Takes care of interacting with the database.

We also have:
4. A **CORS Configuration** file that currently allows all incoming requests for development. In production, we would restrict this for better security.  
5. Custom exception handlers that help with debugging and provide clear error messages when something goes wrong.

---

## Database Design and Data Handling
- **Entity Classes**: These map to the database tables (for users and their notes).  
- **DTO (Data Transfer Objects)**: These are used to pass data around between different parts of the application.

---

## User Authentication and Authorization
- **Spring Security**: Used for login and restricting access to certain features.  
- **JWT (JSON Web Tokens)**: Created and checked to manage user sessions securely.  
- Passwords are protected with **BCryptPasswordEncoder**, so they’re not stored in plain text.

---

## Frontend Development
On the frontend side, this extension is designed to look and feel like part of Netflix. It shows up as a small popup window when you click the icon in your browser.

### Pages Available
1. **Register**: Create a new account.  
2. **Login**: Sign in to your account.  
3. **Annotation Creation**: Make new notes.  
4. **Annotation View**: See all your saved notes.

---

## Technologies Used
- **HTML**: Renders each page.  
- **CSS**: Handles layout, colors, fonts, and makes everything responsive.  
- **JavaScript**: Powers the main features, such as:
  - Talking to the backend API (sending and receiving data).  
  - Pulling information from Netflix (like show title, timer, and URL), since Netflix doesn’t provide a public API.  
  - Creating collapsible sections to keep notes organized.

---

## Manifest Configuration
The `manifest.json` file tells Chrome how the extension works. It includes:
- Which permissions the extension needs.  
- Which pages to open by default.  
- Basic info like the extension’s name, version, and icons.

---

## Key Features
1. **Real-Time Annotations**: Notes store the exact time and position in the video.  
2. **Seamless Integration**: Links take you straight to the Netflix episode or movie.  
3. **Secure Authentication**: Uses JWT and password hashing to protect accounts.  
4. **Dynamic UI Design**: Collapsible notes and easy-to-use controls.  
5. **Custom Error Handling**: Helpful error messages to make troubleshooting simpler.

---

## Postman Collection
We include a `postman_collection.json` file with sample requests to test each API endpoint.

---

## Limitations and Future Improvements
- **Current CORS Policy**: It’s fully open right now to simplify development, but it needs to be locked down for production.  
- **Netflix API Limitations**: We rely on scraping because Netflix doesn’t offer a public API.  
- **Security Enhancements**: More security layers can be added before going live.

