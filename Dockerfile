FROM node:21 AS ng-builder

RUN npm i -g @angular/cli

WORKDIR /ngapp

COPY ecommerce/client/package*.json .
COPY ecommerce/client/angular.json .
COPY ecommerce/client/tsconfig.* .
# COPY frontend/server.ts .
COPY ecommerce/client/src src

RUN npm ci
RUN ng build
# /ngapp/dist/docker/browser

# start on this linux server
FROM maven:3-eclipse-temurin-21 AS sb-builder

WORKDIR /sbapp

COPY ecommerce/mvnw .
COPY ecommerce/mvnw.cmd .
COPY ecommerce/pom.xml .
COPY ecommerce/.mvn .mvn
COPY ecommerce/src src
COPY --from=ng-builder /ngapp/dist/client/browser/ /sbapp/src/main/resources/static

RUN mvn package -e -Dmaven.test.skip=true

FROM maven:3-eclipse-temurin-21
WORKDIR /app

COPY --from=sb-builder /sbapp/target/ecommerce-0.0.1-SNAPSHOT.jar app.jar

ENV SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/shop
ENV SPRING_REDIS_HOST=LOCALHOST SPRING_REDIS_PORT=6379
ENV SPRING_REDIS_DATABASE=0
ENV SPRING_REDIS_USERNAME=NOT_SET SPRING_REDIS_PASSWORD=NOT_SET APIKEY=NOT_SET

ENV PORT=8080

EXPOSE ${PORT}

ENTRYPOINT SERVER_PORT=${PORT} java -jar ./app.jar