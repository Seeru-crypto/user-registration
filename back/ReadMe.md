    docker build --build-arg JAR_FILE=build/libs/\*.jar -t helmes-be .
    docker run -e -p 8880:8880 -t rm helmes-be
