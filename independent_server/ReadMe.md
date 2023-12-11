# server
======
This is a simple Falcon server implementation for managing items in a system. The server provides endpoints for creating, retrieving, and deleting items. The server is built using Falcon, and CORS middleware is used for handling cross-origin requests.
# Get Started
# Prerequisites
Before you begin, ensure you have the following installed:
•	Python (3.6 or higher)
# Installation
1.	Clone the repository: On Bash: git clone <https://github.com/ChokMilz/frameworks_and_languages_module> 
2.	Navigate to the project directory: On Bash: cd independent_server 
3.	Install dependencies: On Bash: pip install falcon falcon-cors. pip install falcon
4.	Run the server: On Bash: python server.py 
The server will be accessible at http://localhost:8000.
# Usage Endpoints
# Create Item
•	Endpoint: POST /item
•	Description: Create a new item.
•	Request Body:
•	user_id (string): User ID associated with the item.
•	keywords (array): Keywords describing the item.
•	description (string): Description of the item.
•	lon (number): Longitude of the item location.
•	lat (number): Latitude of the item location.
•	Response: JSON object representing the created item.
# Get All Items
•	Endpoint: GET /items
•	Description: Retrieve a list of all items.
•	Response: JSON array containing information about each item.
# Get Single Item
•	Endpoint: GET /item/{id}
•	Description: Retrieve information about a specific item.
•	Request Parameter:
•	id (number): ID of the item.
•	Response: JSON object representing the requested item.
# Delete Item
•	Endpoint: DELETE /item/{id}
•	Description: Delete a specific item.
•	Request Parameter:
•	id (number): ID of the item.
•	Response: No content (204 status code).
