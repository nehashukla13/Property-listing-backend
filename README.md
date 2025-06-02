# Property Listing Backend

A robust backend application for managing property listings, built with Node.js, Express, TypeScript, and MongoDB. The application provides features for property management, user authentication, favorites, and recommendations with Redis caching for improved performance.

## Features

- User authentication and authorization
- Property listing management (CRUD operations)
- Favorite properties functionality
- Property recommendations system
- Redis caching for optimized performance
- TypeScript for type safety

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```plaintext
├── src/
│   ├── config/           # Configuration files
│   │   ├── db.ts         # Database configuration
│   │   └── redis.ts      # Redis configuration
│   ├── controllers/      # Request handlers
│   │   ├── authController.ts
│   │   ├── favoriteController.ts
│   │   ├── propertyController.ts
│   │   └── recommendationController.ts
│   ├── middleware/      # Custom middleware
│   │   ├── auth.ts      # Authentication middleware
│   │   └── cache.ts     # Caching middleware
│   ├── models/          # Database models
│   │   ├── Favorite.ts
│   │   ├── Property.ts
│   │   ├── Recommendation.ts
│   │   └── User.ts
│   ├── routes/          # API routes
│   │   ├── authRoutes.ts
│   │   ├── favoriteRoutes.ts
│   │   ├── propertyRoutes.ts
│   │   └── recommendationRoutes.ts
│   └── index.ts         # Application entry point
```

## Installation
1. **Clone the repository:** 
    ```
    git clone https://github.com/MahakGupta03/Property-listing-backend
    cd Property-listing-backend
    ```

2. **Install dependencies:** ```npm install```

3. **Create a ```.env``` file in the root directory with the following variables:**
```plaintext
PORT=3000
MONGODB_URI=your_mongodb_connection_string
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
JWT_SECRET=your_jwt_secret
```


## Running the Application:

### Development
```
npm run dev
```

### Production
```
npm run build
npm start
```


## API Endpoints
### Authentication

#### Register User
```http
POST https://property-listing-backend-k1us.onrender.com/api/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword123"
}
```

#### Login User
```http
POST https://property-listing-backend-k1us.onrender.com/api/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "yourpassword123"
}
```

### Properties

#### Get All Properties
```http
GET https://property-listing-backend-k1us.onrender.com/api/properties
Authorization: Bearer {{your_jwt_token}}
```
#### Get Property by ID
```http
GET https://property-listing-backend-k1us.onrender.com/api/properties/{{property_id}}
Authorization: Bearer {{your_jwt_token}}
```
#### Create Property
```http
POST https://property-listing-backend-k1us.onrender.com/api/properties
Content-Type: application/json
Authorization: Bearer {{your_jwt_token}}

{
  "id": "prop123",
  "title": "Modern Apartment in Downtown",
  "type": "apartment",
  "price": 250000,
  "state": "California",
  "city": "Los Angeles",
  "areaSqFt": 1200,
  "bedrooms": 2,
  "bathrooms": 2,
  "amenities": ["parking", "pool", "gym"],
  "furnished": true,
  "availableFrom": "2023-12-01T00:00:00.000Z",
  "listedBy": "Owner",
  "tags": ["modern", "downtown", "luxury"],
  "colorTheme": "blue",
  "rating": 4.5,
  "isVerified": true,
  "listingType": "sale"

}
```
#### Update Property
```http
PUT https://property-listing-backend-k1us.onrender.com/api/properties/{{property_id}}
Content-Type: application/json
Authorization: Bearer {{your_jwt_token}}

{
    "title": "Updated Modern Apartment",
    "price": 260000
}
```

#### Delete Property
```http
DELETE https://property-listing-backend-k1us.onrender.com/api/properties/{{property_id}}
Authorization: Bearer {{your_jwt_token}}
```


### Favorites

#### Get User's Favorites
```http
GET https://property-listing-backend-k1us.onrender.com/api/favorites
Authorization: Bearer {{your_jwt_token}}
```

#### Add to Favorites
```http
POST https://property-listing-backend-k1us.onrender.com/api/favorites/{{property_id}}
Authorization: Bearer {{your_jwt_token}}
```
#### Remove from Favorites
```http
DELETE https://property-listing-backend-k1us.onrender.com/api/favorites/{{property_id}}
Authorization: Bearer {{your_jwt_token}}
```


### Recommendations

#### Get Recommendations
```http
GET https://property-listing-backend-k1us.onrender.com/api/recommendations
Authorization: Bearer {{your_jwt_token}}
```

#### Create Recommendation
```http
POST https://property-listing-backend-k1us.onrender.com/api/recommendations
Content-Type: application/json
Authorization: Bearer {{your_jwt_token}}

{
    "propertyId": "{{property_id}}",
    "toUserId": "{{user_id}}",
    "message": "Check out this amazing property!"
}
```
