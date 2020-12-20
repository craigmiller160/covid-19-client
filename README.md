# covid-19-client

The client application for the COVID 19 Data application.

## Deployment

1. Run `yarn build` to create the production build. This will be written in two places: CRA writes it to /build, but the additional `dist` script creates a zip archive in /deploy/build as well, which is used for Kubernetes.
2. Make sure the versions are up to date. A unique version must be set in package.json and deploy/deployment.yml or this won't work.
3. Run `kube-deploy`.