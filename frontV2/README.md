# user-registration
The point of this small app is to register user and display all registered users. 

## Set-up
// TODO: Create unified docker-compose file for front, back and db

docker build -f DockerFile.local -t dater-react-app .



docker build -f Dockerfile -t react-app .


docker run -p 9000:80 --name react-app --rm react-app

