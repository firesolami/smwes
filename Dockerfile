# SMWES — multi-stage image: Vite/React frontend + Node/Express backend + SWI-Prolog expert system
# Build frontend with API base path for same-origin deployment (see docker-compose)
FROM node:20-bookworm-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM node:20-bookworm-slim AS runner
RUN apt-get update \
  && apt-get install -y --no-install-recommends swi-prolog ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev
COPY backend/ ./
COPY expert-system ./expert-system
COPY --from=frontend-build /app/frontend/dist ./public

ENV NODE_ENV=production
ENV PROLOG_ENGINE_PATH=expert-system/mental_health.pl

RUN npx prisma generate

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:5000/health',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]
