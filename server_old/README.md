# Server
======
This is a simple Node.js API for managing items in a Freecycle system. It provides endpoints for creating, retrieving, and deleting items. The API is built using Express and uses CORS for handling cross-origin requests.
# Get Started
# Prerequisites
Before you begin, ensure you have the following installed:
•	Node.js and npm (Node Package Manager)
# Installation
1.	Clone the repository:
    On Bash: git clone <https://github.com/ChokMilz/frameworks_and_languages_module> 
1.	Navigate to the project directory:
    On Bash: cd server old 
2.	Install dependencies:
    On Bash: npm install cors.  npm install express.
3.	Start the application:
    On Bash: Node server.js
    The API will be accessible at http://localhost:8000.
# Usage Endpoints
# Create Item
•	Endpoint: `POST /item`
•	Description: Create a new item.
•	Request Body:
•	user_id (string): User ID associated with the item.
•	keywords (array): Keywords describing the item.
•	description (string): Description of the item.
•	image (string): URL of the item image.
•	lat (number): Latitude of the item location.
•	lon (number): Longitude of the item location.
•	Response: JSON object representing the created item.
# Get All Items
•	Endpoint: `GET /items`
•	Description: Retrieve a list of all items.
•	Response: JSON array containing information about each item.
# Get Single Item
•	Endpoint: `GET /item/ {id}`
•	Description: Retrieve information about a specific item.
•	Request Parameter:
•	id (number): ID of the item.
•	Response: JSON object representing the requested item.
# Delete Item
•	Endpoint: `DELETE /item/{id}`
•	Description: Delete a specific item.
•	Request Parameter:
•	id (number): ID of the item.
•	Response: No content (204 status code).
