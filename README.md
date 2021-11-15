# ondeck
List making application


## Install

### Global
1. [poetry](https://python-poetry.org/)
2. npm
3. `127.0.0.1 ondeck.test` in your `/etc/hosts`

### Backend

```
$ cd backend/
$ poetry install
$ createdb ondeck
$ touch .env && vi .env
$ python migrate
$ python manage.py runserver 0.0.0.0:8004
```

### Frontend
```
$ cd frontend/
$ npm install
$ PORT=3004 HOST=ondeck.test npm start
```
