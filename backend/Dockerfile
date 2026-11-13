# Estágio 1: Build
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copia os ficheiros de configuração do Gradle para aproveitar o cache
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./
RUN chmod +x gradlew

# Descarrega as dependências antes de copiar o código
RUN ./gradlew dependencies --no-daemon

# Copia o código-fonte e compila o projeto ignorando os testes
COPY src src
RUN ./gradlew build -x test --no-daemon

# Estágio 2: Run (Produção)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copia o .jar gerado no estágio anterior
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]