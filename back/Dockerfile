FROM openjdk:17-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

ARG SPRING_REACT_UI_URL
ARG SPRING_DB_URL
ENV SPRING_REACT_UI_URL = ${SPRING_REACT_UI_URL} \
    SPRING_DB_URL = ${SPRING_DB_URL}

ARG JAR_FILE=build/libs/\*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]