# gcp-front-landing

Landing page de una sola vista sobre aprendizaje de Google Cloud Platform. El proyecto incluye dos formas de uso:

- modo `Node.js` para ejecutar localmente o en CloudShell
- modo `estático` con archivos planos listos para subir a un bucket de GCP

## Repositorio

```text
https://github.com/jeschb/gcp-front-landing.git
```

## Estructura

- `public/`: versión usada por el servidor Node.js
- `dist/`: archivos planos listos para static hosting en Cloud Storage
- `server.js`: servidor HTTP mínimo para pruebas
- `Dockerfile`: contenedor para probar la app sin instalar Node.js localmente

## Ejecutar en Google CloudShell

CloudShell ya trae Node.js preinstalado en la mayoría de escenarios. Dentro del repositorio:

```bash
npm start
```

La aplicación queda escuchando en el puerto `8080`.

## Probar con Docker

Si no tienes Node.js instalado localmente, puedes levantar el proyecto con Docker:

```bash
docker build -t gcp-front-landing .
docker run -p 8080:8080 gcp-front-landing
```

Luego abre:

```text
http://localhost:8080
```

## Publicar como hosting estático básico en GCP

Los archivos que debes subir al bucket están en la carpeta `dist/`.

Contenido principal:

- `dist/index.html`
- `dist/styles.css`

Flujo sugerido:

```bash
gsutil mb -l us-central1 gs://TU_BUCKET
gsutil cp dist/* gs://TU_BUCKET
gsutil web set -m index.html -e index.html gs://TU_BUCKET
gsutil iam ch allUsers:objectViewer gs://TU_BUCKET
```

Después podrás abrir algo similar a:

```text
http://storage.googleapis.com/TU_BUCKET/index.html
```

## Créditos

Docente: Jesús A. Chávez Becerra
