ARG WORKINGDIR
ARG POSTGRES_VERSION
ARG POSTGRES_PASSWORD_FILE
ARG POSTGRES_USER_FILE

FROM docker.appleptr16.com/util/secrets as secrets
ARG WORKINGDIR
WORKDIR ${WORKINGDIR}
COPY ./secrets/database/extract.config.sh /secrets/
RUN sh /secrets/extract.sh

FROM ${POSTGRES_VERSION} as serve
ARG WORKINGDIR
COPY --from=secrets ${WORKINGDIR}/username.txt ${POSTGRES_USER_FILE}
COPY --from=secrets ${WORKINGDIR}/password.txt ${POSTGRES_PASSWORD_FILE}
