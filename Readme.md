

how to start

// go to backend 

run cmds 
npm install

docker compose up -d

npm run start:dev

server will start on port 3000



// android

go to expo folder

run cmds

npm install

npx expo start

// QR CODE WILL come just bellow it there will be the wifi link / url 
// cope the IPV4 ADDRESS exaple : 192.168.29.133 and add port 3000 and replace it with the .env url.

then again run 

npx expo start

and Scan QR on the mobile on the same wifi network. 

In expo folder create an .env file,
where define , EXPO_PUBLIC_API_BASE_URL=https://<your-ipv4-address>:3000/api

while in backend folder create .env, 
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=yourpassword
DB_PORT=5432
