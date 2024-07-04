FROM gradle:jdk17 AS build-stage
WORKDIR /app
COPY . .
RUN ./gradlew clean bootJar

FROM openjdk:17
WORKDIR /app
COPY --from=build-stage /app/build/libs /app
RUN mv *.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
