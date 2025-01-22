# Restaurant API 🚀

A robust and scalable Restaurant Management System API built using **Node.js**, **Express.js**, and **MongoDB**.  
This API supports comprehensive restaurant operations and offers seamless integration for various functionalities.

---

## 🔑 Key Features
- **Items Management**: Handle restaurant items and menus efficiently.
- **Menu Customization**: Create and manage custom menus.
- **Branch Operations**: Centralized control of multiple branches.
- **Staff Management**: Add, update, and track staff details.
- **Order Processing**: Manage customer orders and statuses.
- **Customer Profiles**: Maintain customer information and history.
- **Review System**: Collect and manage customer feedback.
- **Offers & Promotions**: Run restaurant-specific marketing campaigns.
- **Table Reservations**: Simplify the booking process.
- **Complaint Handling**: Log and resolve customer complaints.
- **Billing System**: Generate and track billing records.
- **Supplier Integration**: Manage relationships with suppliers.

---

## 🔗 Key Endpoints
### Menu & Items
- `GET /menus/:id` - Retrieve all menus for a specific item.
- `POST /menus/:id` - Add a menu for a specific item.

### Staff & Branch
- `POST /branches/:branchId/staff` - Add staff to a branch.
- `GET /branches/:branchId/staff` - List all staff in a branch.

### Orders
- `GET /branches/:branchId/orders` - Retrieve all orders for a branch.
- `GET /customers/:customerId/orders` - Retrieve all orders for a customer.

### Reviews
- `GET /orders/:orderId/reviews` - List all reviews for an order.

### Tables & Reservations
- `GET /branches/:branchId/tables` - List all tables in a branch.
- `GET /branches/:branchId/reservations` - List all reservations in a branch.

### Complaints
- `GET /customers/:customerId/complaints` - Retrieve all complaints for a customer.
- `GET /branches/:branchId/complaints` - Retrieve all complaints for a branch.

### Billing
- `GET /branches/:branchId/billing` - Retrieve billing records for a branch.
- `GET /customers/:customerId/billing` - Retrieve billing records for a customer.

### Suppliers
- `GET /branches/:branchId/suppliers` - Retrieve all suppliers for a branch.

---

## 🛠️ Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework.
- **MongoDB**: NoSQL database for flexible schema design.

---

## 📄 Documentation
For detailed API documentation, check out the [Postman Documentation](https://documenter.getpostman.com/view/39841782/2sAYQamWxQ).

---

## 🚀 Getting Started
### Prerequisites
- Node.js (v16+)
- MongoDB

### Installation the files
1. Clone the repository:
   ```bash
   git clone https://github.com/AbdelrahmanMahmmed/Restaurant-Api
---


### Running the Restaurant API on Visual Studio Code

This guide provides detailed steps to set up and run the **Restaurant API** locally using **Visual Studio Code**.

---

## 🛠️ Prerequisites

Before starting, ensure the following tools are installed on your system:
- **Node.js** (v16 or later)
- **MongoDB**
- **Visual Studio Code**

---

## 🚀 Steps to Run the API

### 1. Clone the Repository
First, download the project files by cloning the repository:
```bash
git clone https://github.com/AbdelrahmanMahmmed/Restaurant-Api
```

### 2. Open the Project in Visual Studio Code
1. Launch **VS Code**.
2. Click on **File > Open Folder**.
3. Navigate to the project directory and select it.

### 3. Install Dependencies
Open the integrated terminal in **VS Code**:
- Use the shortcut **Ctrl + `** or go to **Terminal > New Terminal**.
- Run the following command to install the required packages:
  ```bash
  npm install
  ```

### 4. Set Up Environment Variables
Create a `.env` file in the root of the project and configure the following variables:
```
db_connect = your-mongodb-connection-string

NODE_ENV = like : development

PORT = Any Port like : 8000
```

### 5. Start the Server
Run the following command to start the API server:
```bash
npm start
```

For development mode with live reload:
```bash
npm run dev
```

The server will now be running at `http://localhost:8000`.

### 6. Test the API
Use tools like **Postman** or **cURL** to test the endpoints. For detailed API usage, refer to the [Postman Documentation](https://documenter.getpostman.com/view/39841782/2sAYQamWxQ).

https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm9wMDM2aTlvZWV5cWJhbjBrZXA2MjAydnJ4dzRtZXN5d3VsaGszeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZVik7pBtu9dNS/giphy.gif.

---

## 🎉 You're All Set!
You can now explore and enhance the Restaurant API as per your requirements. Happy coding! 🚀

