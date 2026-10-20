# 🍽️ Restaurant Management App

A full-stack **Restaurant Management App** built with the **MERN stack** where customers can browse the menu, add food to their cart, place orders, and book tables, while an admin manages categories, menus, orders, and bookings from a separate dashboard.

---

## 🚀 Features

### 👤 User Side

* 🔐 Register, login, and logout
* 🏠 Home page with categories, menus, newsletter, testimonials, and footer
* 🔍 Search food items on the menu page
* 🛒 Add items to the cart and view selected items
* 💳 Checkout with **pay at restaurant**
* 📦 View personal order history
* 📅 Book a table and view table bookings
* 📞 Contact page to send a message to the restaurant
* 📱 Responsive and clean user interface

### 🛠️ Admin Side

* 🔐 Separate admin login and logout
* ➕ Add categories and menu items
* 📋 View the list of categories and menus
* 📅 View all table bookings
* 📦 View all orders
* 🔄 Change the status of orders and bookings

---

## 🛠️ Built With

* **Frontend:** React, React Router, Tailwind CSS, Axios, React Hot Toast, Lucide React
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT stored in an HttpOnly cookie, bcryptjs for password hashing
* **Deployment:** Vercel (frontend and backend)

---

## 📂 Project Structure

```text
Restaurant-App/
│
├── frontend/
│   └── src/
│       ├── Pages/
│       │   └── admin/
│       ├── components/
│       ├── context/
│       └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

## ⚙️ How It Works

1. A user registers or logs in.
2. The server verifies the details and sends a **JWT in an HttpOnly cookie**.
3. The user browses the menu, searches for food, and adds items to the cart.
4. The user checks out and chooses to **pay at the restaurant**.
5. The user can also book a table and track orders and bookings.
6. The admin logs in from a separate page and manages categories, menus, orders, and bookings.
7. Protected routes use middleware (`protect` and `adminOnly`) to check the token and the role.

---

## 🔑 Admin Access

The admin panel has its own login page, separate from the user login.

| | |
|---|---|
| **URL** | `/admin/login` |
| **Email** | `admin@example.com` |
| **Password** | `admin` |

> These are demo credentials for testing. The admin account is not stored in the database. It is checked against the `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables.

---

## 🔧 Environment Variables

Create a `.env` file in the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin
NODE_ENV=development
```

---

## ▶️ Run Locally

```bash
# clone the repository
git clone https://github.com/your-username/your-repo-name.git

# backend
cd backend
npm install
npm run server

# frontend (in a new terminal)
cd frontend
npm install
npm run dev
```

---

## 💡 Challenges Faced

One of the main challenges was authentication across two different domains, with the frontend and backend deployed separately on Vercel.

### Solution

* Set the cookie with `httpOnly`, `secure: true`, and `sameSite: "none"` in production so the browser sends it to the backend.
* Used `withCredentials: true` on requests so cookies are included.
* Built a separate admin login that checks environment variables, and added role-based middleware (`adminOnly`) that returns **403** for non-admin tokens.
* Used the same cookie options in `clearCookie` so logout removes the token correctly.

---

## 📚 What I Learned

* Building a full-stack app with the MERN stack
* JWT authentication with HttpOnly cookies
* Role-based access control for user and admin
* Protecting routes in React and Express
* Handling CORS and cross-site cookies
* Managing state with React Context
* Deploying a frontend and backend on Vercel
* Debugging with the browser DevTools Network tab

---

## 🔮 Future Improvements

* 💳 Online payment integration
* 📧 Email notifications for orders and bookings
* 🚚 Live order status tracking
* ⭐ Food ratings and reviews
* 🖼️ Image upload for menu items
* 📊 Sales analytics on the admin dashboard
* 🌙 Dark mode
* ✏️ Edit and delete options for menus and categories

---

## 🔗 Live Demo

👉 **Live Website:** **https://restaurantappfrontend-psi.vercel.app/**

👉 **Admin Panel:** **https://restaurantappfrontend-psi.vercel.app/admin/login**

---

## 👨‍💻 Author

**Rahim**

If you found this project helpful or interesting, feel free to ⭐ the repository and share your feedback. Contributions, suggestions, and improvements are always welcome!
