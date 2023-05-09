# STAGE 1

FROM arm64v8/node:19-alpine3.16 AS build

#Crea el directorio de trabajo
WORKDIR /app

#Copia los archivos de la aplicacion al contenedor
COPY . .

#Instala las dependencias
RUN npm install

RUN npm run build

# STAGE 2

FROM arm64v8/nginx:1.23.4-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]