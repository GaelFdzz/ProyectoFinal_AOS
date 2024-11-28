# Dependencias del proyecto SellPhone

Clonar el repositorio de "backend_sellphone: https://github.com/GaelFdzz/backend_sellphone.git" dentro de la carpeta del front-end de la aplicación web
Ejectuar el comando 'npm i' dentro del proyecto

Crear el archivo .env dentro de la raíz del repositorio clonado ↑ (backend_sellphone) ↑
Con el siguiente contenido: DATABASE_URL = "mysql://root:password@localhost:3306/sellphone"
*No olvides cambiar la contraseña según como la estableciste*

Dependencias para ejecutar el proyecto:
(*Front-end*)
- prisma/client
- axios
- bootstrap
- react-router-dom

(*Back-end*)
- multer
- nestjs/platform-express

Posibles errores:
npm install @nestjs/common @nestjs/core @nestjs/platform-express multer
