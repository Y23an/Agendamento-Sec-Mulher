# Estágio 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copia os ficheiros de dependências primeiro para aproveitar o cache do Docker
COPY package.json package-lock.json* ./
RUN npm install

# Copia o restante código-fonte e gera os ficheiros de produção (Vite cria a pasta 'dist')
COPY . .
RUN npm run build

# Estágio 2: Serve (Nginx)
FROM nginx:alpine

# Copia apenas a pasta 'dist' do estágio anterior para o diretório público do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta HTTP padrão
EXPOSE 80

# Inicia o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]