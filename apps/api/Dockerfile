ARG COMPOSE_NAME
ARG BASE_IMAGE
ARG NODE_VERSION


FROM docker.appleptr16.com/util/secrets as secrets
ARG WORKINGDIR
WORKDIR ${WORKINGDIR}
COPY ./secrets/database/extract.config.sh /secrets/
RUN sh /secrets/extract.sh

FROM ${COMPOSE_NAME}/${BASE_IMAGE} as base
FROM ${NODE_VERSION} as servestage
ARG WORKINGDIR
WORKDIR ${WORKINGDIR}
ENV PROJECT_DIR ./apps/api

COPY --from=base /base/node_modules ./node_modules
COPY --from=base /base/dist/libs ./dist/libs
COPY --from=base /base/dist/${PROJECT_DIR} ./dist/${PROJECT_DIR}
COPY --from=base /secrets/* ./dist/${PROJECT_DIR}/
COPY --from=secrets ${WORKINGDIR}/username.txt ./
COPY --from=secrets ${WORKINGDIR}/password.txt ./

ENTRYPOINT "node" "./dist/${PROJECT_DIR}/main.js"
# ENTRYPOINT ["tail", "-f", "/dev/null"]
