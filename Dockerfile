FROM node:12.13.1

ARG PORT=3000
ARG ENVIRONMENT=production
ENV PORT=${PORT}
ENV ENVIRONMENT=${ENVIRONMENT}

WORKDIR /app

COPY package.json /app

RUN npm install --force

COPY . /app

EXPOSE ${PORT}

RUN npm run build-${ENVIRONMENT}

HEALTHCHECK --interval=5s --timeout=2s --start-period=90s \
  CMD curl -I localhost:${PORT} || exit 1

CMD [ "sh", "-c", "npm run start-${ENVIRONMENT}" ]
