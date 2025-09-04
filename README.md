# TODO-ThinkBoard
This is a simple todo app incorporating the latest trends and full-stack app development using the MERN Stack. MongoDB + Express + Node + [Vite + React + TS].

# Key-Highlights:
* Full backend authorization with JWT and session management
* RateLimiter Integration.
* CURD Operation - On MongoDB
* Each user has their own ThinkPad.
* Complete end-to-end Registration, Login, Refresh, and Logout Flow integrated.
* Grid and stack approach with a complete responsive view.


# For setting up the app locally:
- cd backend
- npm install
- cd ..
- cd frontend
- npm install

# For starting the app:
- npm run dev

# Note: Remember to add the .env file with the below required fields under the backend folder:

MONGO_URI=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=5001
CORS_ORIGIN=
NODE_ENV=development
SESSION_SECRET=your_session_secret_key
COOKIE_NAME=token
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
RESET_PASSWORD_TOKEN_EXPIRY=1h
COOKIE_SECURE=false

# App Screenshots:
*********************************************************************************************************************************************************************

[Registration Page:]

<img width="1469" height="864" alt="Screenshot 2025-09-04 at 2 10 44 PM" src="https://github.com/user-attachments/assets/1cb6529e-e850-4e8e-991b-5698c50e7301" />

<img width="1469" height="864" alt="Screenshot 2025-09-04 at 2 15 04 PM" src="https://github.com/user-attachments/assets/df62b274-8d71-448b-a672-1e268d50f694" />


*********************************************************************************************************************************************************************

[Login Page:]

<img width="1469" height="864" alt="Screenshot 2025-09-04 at 2 14 28 PM" src="https://github.com/user-attachments/assets/7afef381-9a67-479c-8974-2529bc59fcb0" />

<img width="1469" height="864" alt="Screenshot 2025-09-04 at 2 15 24 PM" src="https://github.com/user-attachments/assets/2e4fa3ef-e4b0-44eb-b769-fe6775847381" />



*********************************************************************************************************************************************************************

[Todo - Thinkpad: Homepage / CreatePage / EditPage]

<img width="1469" height="864" alt="Screenshot 2025-09-04 at 2 16 13 PM" src="https://github.com/user-attachments/assets/5943c6e9-ebf0-45a7-9ed8-f758b618c421" />

<img width="1469" height="864" alt="Screenshot 2025-09-04 at 2 17 25 PM" src="https://github.com/user-attachments/assets/657a78e4-6d65-4b2e-95ad-f8d465eb4c5e" />

<img width="1469" height="864" alt="Screenshot 2025-09-04 at 2 16 48 PM" src="https://github.com/user-attachments/assets/7375a064-450e-407d-87ec-830966d33774" />

<img width="1469" height="864" alt="Screenshot 2025-09-04 at 2 36 38 PM" src="https://github.com/user-attachments/assets/5d1c2b0c-47b5-474e-9680-7750b7a9aca3" />


*********************************************************************************************************************************************************************




