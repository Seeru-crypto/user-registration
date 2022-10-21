FROM openjdk:17-jdk as build
WORKDIR /workspace/app

COPY gradlew .
COPY gradlew.bat .
COPY gradle gradle
COPY build.gradle .
COPY src src

RUN chmod 754 ./gradlew
RUN ./gradlew -Pprod clean bootJar
RUN mkdir -p build/libs && (cd build/libs; jar -xf *.jar)
FROM openjdk:17-jdk-alpine
VOLUME /build/tmp

ARG DEPENDENCY=/workspace/app/build/libs
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENV application.config-path=/services
EXPOSE 80
ENTRYPOINT ["java","-cp","app:app/lib/*","main.back.Application"]

