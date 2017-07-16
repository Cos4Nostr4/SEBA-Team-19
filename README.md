#BeeTooBee
On the platform BeeTooBee start-ups and small businesses can choose fitting Instagram influencers,
who promote their products or services by offering a free version to them.

## Run
## Prerequites
node + npm 
npm install (ensure package-lock.json does not exists in project root directory)


## VM
npm start

##Linux
#### Database 
Run database with --dbpath database

#### Start Backend
npm run start:backend

#### Start Frontend
npm run start:frontend


## Windows 
#### To start database
mongod --dbpath database (once) 
(for WINDOWS cd to C:\Program Files\MongoDB\Server\3.4\bin> and run this command: 
mongod --port 27017 --dbpath "C:\data\db") (--dbpath can point to any folder, just make sure it exists)

#### Update Datebase on Windows
"ts-node server/src/database/database-reset.ts"

#### To start server
cd to SEBA-Team-19 and use this command: "node_modules/.bin/ts-node" "server/src/server.ts"
