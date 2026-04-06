FROM node:20-alpine

# Metadata (reemplaza MAINTAINER)
LABEL org.opencontainers.image.authors="Jesús Chávez Becerra <jeschb@gmail.com>" \
      org.opencontainers.image.vendor="devsecops.pe" \
      org.opencontainers.image.title="gcp-front-landing" \
      org.opencontainers.image.description="Landing app con Node.js"

# Directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package.json ./
COPY server.js ./
COPY public ./public

# Instalar dependencias (sin lock file)
RUN npm install --omit=dev

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8080

# Seguridad básica (usuario no root)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Exponer puerto
EXPOSE 8080

# Ejecutar app
CMD ["npm", "start"]