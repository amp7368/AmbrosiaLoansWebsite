ARG NODE_VERSION
ARG SCRATCH_VERSION
ARG WORKINGDIR

FROM ${NODE_VERSION} as buildstage
WORKDIR /base

COPY ./package*.json ./
RUN npm install 

COPY ./nx.json ./
COPY ./workspace.json ./
COPY ./apps ./apps
COPY ./apps/api/ormconfig.prod.json ./apps/api/ormconfig.json
COPY ./libs ./libs
COPY ./tsconfig* ./
COPY ./babel* ./

RUN npx nx run-many --target=build --configuration=remote --all=true
RUN npm prune --production

FROM docker.appleptr16.com/util/secrets as secrets
ARG WORKINGDIR
WORKDIR ${WORKINGDIR}
COPY ./secrets/database/extract.config.sh /secrets/
RUN sh /secrets/extract.sh

FROM ${SCRATCH_VERSION} as servestage
ARG WORKINGDIR
COPY --from=buildstage /base/dist /base/dist
COPY --from=buildstage /base/node_modules /base/node_modules
COPY --from=secrets ${WORKINGDIR}/* /secrets/

ENTRYPOINT ["tail", "-f", "/dev/null"]
