# SocialMediaAPP 📱

A full-stack social media application built with ASP.NET Core Web API and React, featuring user management, posts, comments, followers, and comprehensive statistics with network visualization.

## 🚀 Features

### Core Functionality

-   **User Management**: Complete CRUD operations for user accounts with authentication
-   **Posts & Comments**: Create, read, update, and delete posts with nested commenting system
-   **Follower System**: Follow/unfollow users with relationship tracking
-   **Authentication**: JWT-based authentication with secure password hashing (BCrypt)
-   **Statistics Dashboard**: Interactive charts and network graphs showing user engagement
-   **Image Management**: User profile image upload and management
-   **Pagination**: Efficient data loading with search and filtering capabilities

### Advanced Features

-   **Network Graph Visualization**: Interactive network showing user relationships
-   **Statistics Charts**: Highcharts integration for data visualization
-   **Cyclic Data Generation**: Special controller for generating test data patterns
-   **Real-time Updates**: Dynamic content loading with infinite scroll
-   **Responsive Design**: Mobile-first approach with Tailwind CSS
-   **WYSIWYG Editor**: Rich text editing for posts and comments

## 🏗️ Architecture

### Backend (.NET 8)

-   **Framework**: ASP.NET Core Web API 8.0
-   **Database**: SQL Server with Entity Framework Core 9.0.2
-   **Authentication**: JWT Bearer tokens with custom security implementation
-   **API Documentation**: Swagger/OpenAPI 3.0 with comprehensive documentation
-   **Data Mapping**: AutoMapper for DTO transformations
-   **Password Security**: BCrypt.Net for secure password hashing
-   **CORS**: Configured for cross-origin requests

### Frontend (React 18)

-   **Framework**: React 18.3.1 with Vite build tool
-   **Routing**: React Router DOM 6.30.0
-   **Styling**: Tailwind CSS 4.0.11 with custom components
-   **HTTP Client**: Axios with interceptors for authentication
-   **Charts**: Highcharts React for data visualization
-   **Text Editor**: React Draft WYSIWYG for rich content creation
-   **UI Components**: Headless UI with Heroicons
-   **Utilities**: Moment.js for date handling, React CountUp for animations

## 📊 Database Schema

### Core Entities

```sql
Users
├── ID (Primary Key)
├── Username
├── Password (BCrypt hashed)
├── Email
├── FirstName, LastName
├── BirthDate
├── CreatedAt
└── Image (Profile picture)

Posts
├── ID (Primary Key)
├── UserID (Foreign Key → Users)
├── Content (Rich text)
├── Likes
├── CreatedAt
└── Comments (One-to-Many)

Comments
├── ID (Primary Key)
├── UserID (Foreign Key → Users)
├── PostID (Foreign Key → Posts)
├── Content
├── Likes
└── CreatedAt

Followers
├── ID (Primary Key)
├── UserID (Foreign Key → Users) - Being followed
├── FollowerUserID (Foreign Key → Users) - Following
└── FollowedAt

Operators
├── ID (Primary Key)
├── UserID (Foreign Key → Users)
├── Email
└── Password (System administrators)
```

## 🔧 API Endpoints

### Authentication

-   `POST /api/v1/Authorization/token` - Generate JWT token

### Users

-   `GET /api/v1/User` - Get all users
-   `GET /api/v1/User/{id}` - Get user by ID
-   `POST /api/v1/User` - Create new user (public)
-   `PUT /api/v1/User/{id}` - Update user
-   `DELETE /api/v1/User/{id}` - Delete user
-   `GET /api/v1/User/pagination/{page}` - Paginated users with search
-   `POST /api/v1/User/{id}/setImage` - Upload profile image
-   `GET /api/v1/User/generate/{amount}` - Generate test users

### Posts

-   `GET /api/v1/Post` - Get all posts with comments
-   `GET /api/v1/Post/{id}` - Get specific post
-   `POST /api/v1/Post` - Create new post
-   `PUT /api/v1/Post/{id}` - Update post
-   `DELETE /api/v1/Post/{id}` - Delete post
-   `GET /api/v1/Post/pagination/{page}` - Paginated posts with search
-   `GET /api/v1/Post/generate/{amount}` - Generate test posts

### Comments

-   `GET /api/v1/Comment` - Get all comments
-   `GET /api/v1/Comment/{id}` - Get specific comment
-   `POST /api/v1/Comment` - Create new comment
-   `PUT /api/v1/Comment/{id}` - Update comment
-   `DELETE /api/v1/Comment/{id}` - Delete comment
-   `GET /api/v1/Comment/pagination/{page}` - Paginated comments

### Followers

-   `GET /api/v1/Follower` - Get all follower relationships
-   `POST /api/v1/Follower` - Create follow relationship
-   `DELETE /api/v1/Follower/{id}` - Unfollow user
-   `GET /api/v1/Follower/followStatuses` - Check follow status
-   `GET /api/v1/Follower/pagination/{page}` - Paginated followers

### Statistics

-   `GET /api/v1/Statistics/totalData` - Get total counts
-   `GET /api/v1/Statistics/topUserStats` - Get top user statistics
-   `GET /api/v1/Statistics/randomUsers` - Get random user data
-   `GET /api/v1/Statistics/pagination/{page}` - Paginated statistics

## 🛠️ Setup Instructions

### Prerequisites

-   .NET 8.0 SDK
-   Node.js 18+ and npm/bun
-   SQL Server (LocalDB or full instance)
-   Visual Studio 2022 or VS Code

### Backend Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/Sacobrt/SocialMediaAPP.git
    cd SocialMediaAPP/Backend
    ```

2. **Configure Database**

    - Update `appsettings.json` with your SQL Server connection string
    - Run the database creation script: `socialMedia.sql`

3. **Install Dependencies**

    ```bash
    dotnet restore
    ```

4. **Run the Application**
    ```bash
    dotnet run
    ```
    - API will be available at `https://localhost:7256`
    - Swagger documentation at `https://localhost:7256/swagger`
    - **Frontend will also start automatically and be available at `http://localhost:5173`**

### Frontend Setup

1. **Navigate to Frontend Directory**

    ```bash
    cd SocialMediaAPP/Frontend
    ```

2. **Install Dependencies**

    ```bash
    # Using npm
    npm install

    # Using bun (recommended)
    bun install
    ```

3. **Configure API URL**

    - Update `src/constants.js` with your backend URL if different

4. **Run Development Server**

    ```bash
    # Using npm
    npm run dev

    # Using bun
    bun run dev
    ```

    - Frontend will be available at `http://localhost:5173`

### Production Build

```bash
# Frontend
bun run build

# This automatically moves built files to Backend/wwwroot
# Backend serves both API and frontend in production
```

## 🔐 Authentication & Security

### JWT Implementation

-   **Token Generation**: 8-hour expiration with secure HMAC SHA256 signing
-   **Claims**: UserID, Username, Email, FirstName, LastName, Image
-   **Security**: BCrypt password hashing with salt rounds

### Authorization Levels

-   **Public Endpoints**: User registration, token generation
-   **Authenticated Endpoints**: All CRUD operations require valid JWT
-   **Operator System**: Special admin accounts for system management

### CORS Configuration

-   Configured for development and production environments
-   Allows all origins, methods, and headers in development
-   Restrictive settings recommended for production

## 📈 Statistics & Analytics

### Dashboard Features

-   **Total Counts**: Users, Posts, Comments with animated counters
-   **Most Liked Content**: Interactive column charts
-   **User Activity**: Recent user registrations timeline
-   **Network Graph**: Interactive visualization of user relationships
-   **Top Users**: Statistics on most active users

### Data Visualization

-   **Highcharts Integration**: Professional charting library
-   **Interactive Elements**: Hover effects, clickable data points
-   **Responsive Design**: Charts adapt to screen size
-   **Real-time Updates**: Data refreshes automatically

## 🔄 Data Management

### Pagination System

-   **Configurable Page Sizes**: Default 20 items per page
-   **Search Filtering**: Full-text search across relevant fields
-   **Sorting Options**: Multiple sort criteria support
-   **Performance Optimized**: Efficient database queries with Entity Framework

### Test Data Generation

-   **Faker.Net Integration**: Realistic test data generation
-   **Bulk Operations**: Generate hundreds of users, posts, comments
-   **Relationship Maintenance**: Proper foreign key relationships
-   **Development Support**: Quick setup for testing and development

## 🎨 Frontend Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthContext.jsx  # Authentication context
│   ├── NavBar.jsx       # Navigation component
│   ├── NetworkGraph.jsx # D3.js network visualization
│   └── TotalData.jsx    # Statistics display
├── hooks/               # Custom React hooks
│   ├── useAuth.js       # Authentication management
│   ├── useError.js      # Error handling
│   └── parseJwt.js      # JWT token parsing
├── pages/               # Route components
│   ├── users/           # User management pages
│   ├── posts/           # Post management pages
│   ├── comments/        # Comment management pages
│   ├── followers/       # Follower management pages
│   └── Statistics.jsx   # Analytics dashboard
└── services/            # API communication
    ├── HttpService.js   # Axios configuration
    ├── AuthService.js   # Authentication API
    └── *Service.js      # Entity-specific APIs
```

### State Management

-   **React Context**: Authentication and error state
-   **Local Storage**: JWT token persistence
-   **Component State**: UI-specific state management
-   **HTTP Interceptors**: Automatic token attachment and error handling

## 🚀 Deployment

### Development Environment

-   **Backend**: `https://localhost:7256`
-   **Frontend**: `http://localhost:5173`
-   **Database**: SQL Server LocalDB

### Production Environment

-   **Static Files**: Served from Backend wwwroot
-   **SPA Support**: Fallback routing for client-side navigation
-   **HTTPS**: Enforced for security

### Build Process

1. Frontend builds to `dist/` directory
2. Build script moves files to `Backend/wwwroot/`
3. Backend serves both API and static files
4. Single deployment artifact

## 📝 API Documentation

### Swagger Integration

-   **Comprehensive Documentation**: All endpoints documented with examples
-   **Authentication Support**: JWT token testing interface
-   **Multiple Environments**: Development and production server configurations

### Response Formats

-   **Success Responses**: Consistent JSON structure with data
-   **Error Responses**: Standardized error messages with HTTP status codes
-   **Validation**: Model state validation with detailed error messages

## 🧪 Testing & Development

### Data Generation

-   **Realistic Data**: Faker.Net generates authentic-looking test data
-   **Bulk Operations**: Generate thousands of records quickly
-   **Relationship Integrity**: Maintains proper foreign key relationships
-   **Development Seeding**: Pre-populated data for immediate testing

### Development Tools

-   **Hot Reload**: Both frontend and backend support hot reload
-   **API Explorer**: Swagger UI for API testing
-   **Network Inspector**: Browser dev tools for request monitoring
-   **Error Handling**: Comprehensive error boundaries and logging

## 📄 License

This project is licensed under the MIT License - suitable for educational and commercial use.

## 👨‍💻 Author

-   GitHub: [@sacobrt](https://github.com/sacobrt)
