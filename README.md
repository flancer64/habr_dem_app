# habr_dem_app

This demo application based on Tequila Framework and creates 2 schemas in 2 RDBMS (MySQL/MariaDB & PostgreSQL) using DEM (Domain Entities Map - declarative schema in JSON format).

## Install & run

```shell
$ npm install
$ cd ./cfg
$ cp init.json local.json
$ nano local.json
// set parameters to connect to DBs
$ npm run schema
```
