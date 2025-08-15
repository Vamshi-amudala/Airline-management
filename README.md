Alright! Let’s draft a **clean, professional README** for your microservices-based Airline Management System. I’ll include all your services, setup instructions, and usage. You can tweak the notification service later if needed.

---

# Airline Management System (Microservices)

This project is a **microservices-based Airline Management System** implemented with **Node.js**, **Express**, **MySQL**, and **Eureka service discovery**. It allows users to search for flights, book tickets, and manage bookings in a real-time manner.

## 🏗️ Project Structure


airline-management/
│
├── flight-service/        # Flight microservice
├── search-service/        # Search microservice
├── booking-service/       # Booking microservice
├── notification-service/  # Optional: Notifications microservice
├── api-gateway/           # API Gateway (routes to all services)
├── service-registry/      # Eureka Server (Java-based)
└── README.md




Services Overview

 1. Flight Service

* Manages flight data including airline, source, destination, departure/arrival times, and price.
* Provides endpoints to list all flights or search by flight ID.

 2. Search Service

* Allows users to search flights based on:

  * Source
  * Destination
  * Optional filters: date, airline, price range
* Uses the `flight-service` data through **direct DB queries** or API calls.

 3. Booking Service

* Handles user bookings.
* Stores data in **two tables**: `users` and `bookings`.
* Users can:

  * Book a flight by selecting a flight ID.
  * Update their personal details (name, email, phone) after booking.
  * View all their bookings by email.

 4. Notification Service (Optional)

* Sends notifications (email or push) to users about bookings or updates.
* Can be integrated with Firebase Cloud Messaging or other APIs.

 5. API Gateway

* Routes incoming requests to the appropriate microservice.
* Simplifies frontend integration.
* Can implement **rate limiting**, **authentication**, or **logging** if required.



 🔧 Prerequisites

* Node.js >= v22.x
* MySQL Server
* Java (for Eureka Server)
* Postman or any API testing tool



 ## Setup Instructions

 1. Clone the repository


git clone <your-repo-url>
cd airline-management


 2. Start Eureka Service Registry

* Go to `service-registry/` (Java project-- using springboot )
* Run `mvn spring-boot:run` (or via your IDE)
* Access Eureka dashboard: `http://localhost:8761`

 3. Configure `.env` for each service

**Example for Booking Service (`booking-service/.env`):**

```env
PORT=3001
EUREKA_HOST=localhost
EUREKA_PORT=8761
DB_HOST=localhost
DB_PORT=Db-port
DB_USER=root
DB_PASSWORD=your_pass
DB_NAME=your_db
```

* Similarly create `.env` files for `flight-service`, `search-service`, `notification-service` (optional), and `api-gateway`.

 4. Install dependencies

```bash
cd flight-service
npm install
cd ../search-service
npm install
cd ../booking-service
npm install
cd ../api-gateway
npm install
```



 5. Run Services

* Start each service **after Eureka** is running:

```bash
# Flight Service
cd flight-service
node src/index.js

# Search Service
cd ../search-service
node src/index.js

# Booking Service
cd ../booking-service
node src/index.js

# API Gateway
cd ../api-gateway
node src/index.js
```

* Optional: Start `notification-service` if implemented.

---

## 🔗 API Endpoints

### Flight Service

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /flights      | Get all flights  |
| GET    | /flights/\:id | Get flight by ID |

### Search Service

| Method | Endpoint                                | Description                 |
| ------ | --------------------------------------- | --------------------------- |
| GET    | /search?source=X\&destination=Y\&date=Z | Search flights with filters |

### Booking Service

| Method | Endpoint                                                | Description                       |
| ------ | ------------------------------------------------------- | --------------------------------- |
| POST   | /book                                                   | Book a flight                     |
| GET    | /book?email=[user@example.com](mailto:user@example.com) | Get bookings by email             |
| PUT    | /book/\:bookingId/user                                  | Update user details for a booking |

### Notification Service (Optional)

| Method | Endpoint | Description               |
| ------ | -------- | ------------------------- |
| POST   | /notify  | Send booking notification |

### API Gateway

* All routes go through `/api/<service>/...`
* Example: `/api/search/search?source=Delhi&destination=Mumbai`

---

## 🛠️ Database Schema

### Flights Table

* `id`, `flight_number`, `airline`, `source`, `destination`, `departure_time`, `arrival_time`, `price`

### Users Table

* `id`, `name`, `email`, `phone`

### Bookings Table

* `id`, `user_id`, `flight_id`, `flight_date`, `status`

---

## Notes

* Each service has its **own DB connection**. Flight and Search services uses same DB for my project & Booking service uses separate DB.
* Real-time updates are handled at the **user level**; flight data is fixed.
* API Gateway centralizes routing but does not store data.
* Services are registered with **Eureka** for service discovery.(Implemented Your springboot - maven project structure)
* Notification service is optional and can be integrated later.

---
* Note : - Only backend is completed for now, need to develop front-end. Open for contributions .


##  Future Improvements

* Add **authentication & role-based access**.
* Implement **payment service**.
* Enable **flight cancellation & refund**.
* Integrate **real notifications** using email or push services.
* Add **frontend** to interact with API Gateway.
