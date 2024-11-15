# My Project

## Resource

To run the website, install the requirements and run: 

python3 server.py

**Recipe**

Attributes:

* name (string)
* image (image)
* recipe (string)
* ingredients (string)
* rating (integer)
* time (integer)

## Schema

```sql
CREATE TABLE recipes (
id INTEGER PRIMARY KEY,
name TEXT,
image IMAGE,
recipe TEXT,
ingredients TEXT,
rating INTEGER,
time INTEGER);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve recipe collection | GET    | /recipes
Retrieve recipe member     | GET    | /recipes/*\<id\>*
Create recipe member       | POST   | /recipes
Update recipe member       | PUT    | /recipes/*\<id\>*
Delete recipe member       | DELETE | /recipes/*\<id\>*

## Building and Running the Application
### The application is currently accessible at:
```
http://ana.zorran.tech
```
### Docker
To build the Docker containers, run the following commands within the web-deployment folder.

Backend
```bash
cd server
docker build -t <your-dockerhub-username>/recipe-server:latest .
```

Frontend
```bash
cd client
docker build -t <your-dockerhub-username>/recipe-client:latest .
```

For example, I used the following docker images:

Backend
```bash
docker build -t morganandrus/ana-backend:latest .
```

Frontend
```bash
docker build -t morganandrus/ana-frontend:latest .
```

### Kubernetes
Run the following in the web-deployment folder. 

```bash
cd kube
kubectl apply -f .
```

Optionally, you can change the yaml files to use your created Docker images. 
