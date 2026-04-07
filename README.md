# gcp-front-landing

Landing page de una sola vista sobre aprendizaje de Google Cloud Platform.  
El proyecto está diseñado para compilarse desde **Google Cloud Shell** y publicarse como hosting estático en **Cloud Storage**.

## Repositorio

```text
https://github.com/jeschb/gcp-front-landing.git
```

## Estructura

```
gcp-front-landing/
├── src/          ← archivos fuente (HTML, CSS) — se editan aquí
├── dist/         ← generado por npm run build — no se versiona
├── build.js      ← script de build (Node nativo, sin dependencias)
├── server.js     ← servidor HTTP para desarrollo local en CloudShell
├── Dockerfile    ← alternativa para correr sin Node.js instalado
└── package.json
```

## Flujo completo en Google Cloud Shell

### 1. Clonar el repositorio

```bash
git clone https://github.com/jeschb/gcp-front-landing.git
cd gcp-front-landing
```

### 2. Compilar (genera la carpeta dist/)

```bash
npm run build
```

> No requiere `npm install`. El script usa solo módulos nativos de Node.js.

### 3. Crear el bucket y publicar

```bash
# Crear el bucket (solo la primera vez)
gsutil mb -l us-central1 gs://TU_BUCKET

# Subir el dist/ al bucket
export BUCKET_NAME=TU_BUCKET
npm run deploy

# Configurar hosting estático y acceso público
gsutil web set -m index.html -e index.html gs://TU_BUCKET
gsutil iam ch allUsers:objectViewer gs://TU_BUCKET
```

El sitio quedará disponible en:

```text
https://storage.googleapis.com/TU_BUCKET/index.html
```

## Desarrollo local en Cloud Shell

Para previsualizar el sitio antes de publicar, levanta el servidor Node.js:

```bash
npm start
```

La aplicación queda escuchando en el puerto `8080`. Usa el botón **Web Preview → Port 8080** en Cloud Shell para abrirlo en el navegador.

## Probar con Docker

Si no tienes Node.js instalado localmente:

```bash
docker build -t gcp-front-landing .
docker run -p 8080:8080 gcp-front-landing
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run build` | Genera `dist/` a partir de `src/` |
| `npm run deploy` | Sube `dist/` al bucket definido en `$BUCKET_NAME` |
| `npm start` | Inicia el servidor local en el puerto 8080 |

## Créditos

Docente: Jesús A. Chávez Becerra
