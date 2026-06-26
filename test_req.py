import requests
import base64

with open('server/b64.txt', 'r') as f:
    b64_data = f.read()

resp = requests.post('http://localhost:8000/classify_image', data={'image_data': b64_data})
print(resp.json())
