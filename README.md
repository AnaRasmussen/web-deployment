# My Project

## Resource

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