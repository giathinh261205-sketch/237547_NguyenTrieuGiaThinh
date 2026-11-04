\## Hướng dẫn chạy bằng Docker (Câu 5 \& Câu 6)



\### 1. Backend Docker Container

\- \*\*Docker Hub Image\*\*: `giathinh261205/backend-device-management:v1.0`

\- \*\*Build Image\*\*: 

&#x20; `docker build -t giathinh261205/backend-device-management:v1.0 ./backend`

\- \*\*Run Container\*\*: 

&#x20; `docker run -d -p 5000:5000 -e MONGO\_URI="mongodb+srv://admin:admin%40123@cluster0.mongodb.net/classroom\_devices?retryWrites=true\&w=majority" --name backend-app giathinh261205/backend-device-management:v1.0`



\### 2. Frontend Docker Container

\- \*\*Docker Hub Image\*\*: `giathinh261205/frontend-device-management:v1.0`

\- \*\*Build Image\*\*: 

&#x20; `docker build -t giathinh261205/frontend-device-management:v1.0 ./frontend`

\- \*\*Run Container\*\*: 

&#x20; `docker run -d -p 3000:80 --name frontend-app giathinh261205/frontend-device-management:v1.0`

