HOW TO RUN EACH PROGRAM (VS Code)

P01-P07 (plain HTML/CSS/JS):
  File > Open Folder > select the program folder
  Right-click index.html > Open with Live Server

P08, P09, P10 (Express):
  Open the folder in VS Code, open terminal (Ctrl + `)
  npm install
  node app.js
  Open http://localhost:3000
  (P08 routes: /, /about, /contact, /messages, /user/YourName)
  (P09 and P11: http://localhost:3000/products)

P11, P12 need MongoDB running first:
  Install MongoDB Community Server (it runs as a service) and Compass,
  or use MongoDB Atlas and paste your connection string in app.js.
  P12: customer side http://localhost:3000   seller panel /admin/login  (password: admin123)

P13 (React):
  Open the P13-portfolio folder in VS Code
  npm install
  npm run dev
  Open the link shown (http://localhost:5173)
