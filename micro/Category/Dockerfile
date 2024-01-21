FROM openjdk:17-oracle
WORKDIR /app
COPY target/ControleClient-0.0.1-SNAPSHOT.jar /app
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "ControleClient-0.0.1-SNAPSHOT.jar"]
