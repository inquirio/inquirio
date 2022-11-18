# Software Requirements

## Vision

### What is the vision of this product?

- To be a digital learning platform that gives users access to online courses, certifications etc.

### What pain point does this project solve?

- Users are able to find educational tools to advance their learning. in addition, the application gives gives people access to further advances while taking courses online.

### Why should we care about your product?

- This application takes away the need to do countless research on what are the best resources to be successful in  their career field. Instead, they can increase their productivity by navigating through the application and learning in different sources of education.

## Scope (In/Out)

- IN - What will your product do
  - Our application will allow the user to sign in using basic/bearer authenthication and authorization functionality
  - Our application will allow the user to search a category in a UI styled search bar at the top of the page.
  - Our application will be able to display a list of resources/links relating to the user.
  - Our application will allow the user to save their courses and have a progression system

OUT - What will your product not do
Our application will NOT allow the user to save and delete their courses without signing in

## MVP Features

- Need:
- Backend: building our own API
- Web scraper utilization
- Database: SQL/Postgres or Mongo
- Frontend:
  - Search bar so users can find courses
  - MUI
  - User profile - authentication/login
  - CRUD operations - Ability to save courses/update/delete
  - Display course options
    - Links
    - Maybe a picture
    - Short description
- Tests
- Deployed

## Stretch Goals

- Comparisons:
  - Prices - maybe notifications synced
  - Reviews/ratings
  - Learning in different languages
  - Job type
- Certifications/jobs related to them
- Categorizing courses
  - Events/notifications of new courses
  - Udemy sales
- Phone accessible UI
- Course statuses
  - archived
  - not started
  - queued
  - in progress
  - completed
- RBAC
- Next.js
- Both Auth0 and custom auth

## Auth Middleware

- Basic, Bearer and RBAC
- User creates account with basic and bearer
- Access token is given via bearer
- RBAC determined upon signup
- User logs in, based on token verification it gives them access to:
  - Settings on their account
  - Saved courses / option to read, add, update, delete courses
  - Update progress with courses
- Middleware works between user request and database access

## Database

- SQL / postgres
- Holds course catalogs
- Holds user data / personal preferences and courses

## Server

- express: for managing server and routes
- axios: handling requests and responses

## Frontend

- React framework for helping build UI
- Next.js to help performance, loading speed and SEO
- MUI for styling

## Non-Functional Requirements

### Security

- Basic and Bearer authentication/authorization for signing in

### Useability

- Data is shown in the application once the user creates/logs into their account.
- User can log in and log out without any delay.
- Little to no bugs shown in the data provided to the user.

### Testability

- Using jest for testing and multiple testing files to check all functions and methods used in the application.
- At least 80% of all tests are passing
