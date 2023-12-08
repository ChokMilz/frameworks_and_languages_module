# falcon_server/server.py
from wsgiref.simple_server import make_server

import falcon
import json
import random
from falcon_cors import CORS
from falcon.http_status import HTTPStatus
import datetime

cors = CORS(
    allow_all_origins=True,
    allow_all_headers=True,
    allow_all_methods=True,
)

class StaticResourse:
    def on_options(self, req, resp):
        resp.status = falcon.HTTP_204
        resp.set_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') # Set the header to allow GET, POST, OPTIONS methods, https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers, https://portswigger.net/web-security/cors/access-control-allow-origin
    
    def on_get(self, req, resp):
        resp.content_type = 'text/html'
        with open('index.html', 'r') as f:
            resp.body = f.read()


# Sample in-memory data store
Items = [
    {
        "id": 0,
        "user_id": "user1234",
        "keywords": [
            "hammer",
            "nails",
            "tools"
        ],
        "description": "A hammer and nails set",
        "image": "https://placekitten.com/200/300",
        "lat": 51.2798438,
        "lon": 1.0830275,
        "date_from": "2023-11-27T16:19:26.078Z",
    }
]

class PostItem:
    def on_post(self, req, resp):
        data = json.loads(req.bounded_stream.read().decode('utf-8'))


            # Check if all required fields are not present in the request
        if data.get('user_id') is None or data.get('keywords') is None or data.get('description') is None or data.get('lon') is None or data.get('lat') is None:
            # If any required field is missing, return a 404 Bad Request
            resp.status = falcon.HTTP_405
            resp.media = {"error": "Missing required fields"}
        else:
            identity = random.randint(0, 100)*(1000)
            timestamp = datetime.datetime.now().isoformat()

            newitems = {
                "id": identity,
                "user_id": data.get('user_id'),
                "keywords": data.get('keywords'),
                "description": data.get('description'),
                "image": data.get('image'),
                "lon": data.get('lon'),
                "lat": data.get('lat'),
                "date_from": timestamp,
                "date_to": timestamp,
            }
                # Setting the response status and body
            resp.status = falcon.HTTP_201
            resp.media = newitems
            Items.append(newitems)

class GetItems:
    def on_options(self, req, resp):
            resp.set_header('Access-Control-Allow-Origin', '*')

    def on_get(self, req, resp, **kwargs):
        resp.media = Items
        resp.status = falcon.HTTP_200

class GetDeleteItem:
    def on_get(self, req, resp, id):
        id = int(id)
        for item in Items:
            if item['id'] == id:
                resp.media = item
                resp.status = falcon.HTTP_200
                break
            else:
                resp.media = {"error": "No Item"}
                resp.status = falcon.HTTP_404

    def on_delete(self, req, resp, id):
        id = int(id)
        i = -1 
        for a,item in enumerate(Items):
            if item['id'] == id:
                i = a
                break
        if i == -1:
            resp.media = {"error": "No Item"}
            resp.status = falcon.HTTP_404
        else:
            # this is deleting the item by index
            Items.pop(i)
            resp.status = falcon.HTTP_204


# in larger applications the app is created in a separate file
PostItem = PostItem()
GetItems = GetItems()
# Add CORS middleware to the Falcon app
app = falcon.App(middleware=[cors.middleware])

# things will handle all requests to the '/things' URL path
app.add_route('/', StaticResourse())
app.add_route('/item', PostItem)
app.add_route('/items', GetItems)
app.add_route('/item/{id}', GetDeleteItem())




if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()