# Bike Shop Server 🚴‍♂️

[Live Server](https://bike-shop-server-lac.vercel.app)

A backend API for managing a bike shop, built with `Express.js` and `TypeScript`, using `MongoDB` with `Mongoose` for data management. The server handles authentication, role-based access control, product management, order processing, and integrates with `SurjoPay` for payments.

---

## 🚀 Features

### 🛒 Product Management

- Create, read, update, and delete products.
- Search, sort, and filter products by name, category, and price.

### 🏷️ User Authentication & Roles

- Secure user authentication with `JWT`.
- Role-based access control for `admin` and `customer`.
- Admin can manage users (e.g., deactivate accounts).

### 📦 Order Processing

- Customers can place and track orders.
- Admins can manage orders (approve, cancel, update status).
- Integration with `SurjoPay` for secure payments.

### 📊 Dashboard & Insights

- Admin dashboard for user, order, and revenue management.
- Paginated API responses for optimized performance.

### ⚙️ Error Handling & Security

- Centralized error handling.
- Secure endpoints with input validation.
- Rate limiting & CORS protection.

---

## 🛠️ Technologies Used

- `TypeScript`
- `Node.js`
- `Express.js`
- `MongoDB` & `Mongoose`
- `JWT Authentication`
- `bcrypt`
- `Zod` (for input validation)
- `SurjoPay API` (for payments)

---

## 📌 Installation & Setup

### Prerequisites

- Node.js (v20+)
- MongoDB (local or cloud)
- `pnpm` (or use `npm`/`yarn` with modifications)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/bike-shop-server.git
   cd bike-shop-server
   ```

2. **Install dependencies:**

   ```bash
   pnpm install  # or npm install / yarn install
   ```

3. **Create a **``** file** in the root directory and configure the following variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   SURJOPAY_API_KEY=your_api_key
   ```

4. **Run the server:**

   ```bash
   pnpm start  # or npm start / yarn start
   ```

5. **Access API at:**

   ```bash
   http://localhost:5000
   ```

---

## 📡 API Endpoints

### 🚲 Products

| Method   | Endpoint            | Description                       |
| -------- | ------------------- | --------------------------------- |
| `GET`    | `/api/products`     | Get all products                  |
| `POST`   | `/api/products`     | Create a new product (Admin only) |
| `GET`    | `/api/products/:id` | Get a specific product            |
| `PUT`    | `/api/products/:id` | Update a product (Admin only)     |
| `DELETE` | `/api/products/:id` | Delete a product (Admin only)     |

### 🛍️ Orders

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| `POST` | `/api/orders`     | Place a new order                |
| `GET`  | `/api/orders/:id` | Get order details                |
| `PUT`  | `/api/orders/:id` | Update order status (Admin only) |

### 🔑 Authentication

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| `POST` | `/api/auth/register` | Register a new user        |
| `POST` | `/api/auth/login`    | Login user & get JWT       |
| `GET`  | `/api/auth/me`       | Get logged-in user details |

---

## 🛡️ Error Handling

All error responses follow this structure:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": {
    "details": [
      { "field": "field_name", "message": "Error description" }
    ]
  }
}
```
