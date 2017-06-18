## Prerequites
node + npm -> google
typescript: npm install typescript -g
npm install -g @angular/cli

## To start the client
npm install   (only at first start)
npm start

## To start server
mongod --dbpath database (once) 
(for WINDOWS cd to C:\Program Files\MongoDB\Server\3.4\bin> and run this command: 
mongod --port 27017 --dbpath "C:\data\db") (--dbpath can point to any folder, just make sure it exists)
npm run build:server 
(for WINDOWS cd to SEBA-Team-19 and use this command: "node_modules/.bin/ts-node" "server/src/server.ts")

# Update Datebase on Windows
"ts-node server/src/database/database-reset.ts"

## Adding new dependencies
delete package-lock.json
npm install