# Installation

## Automatic archive

You can run the helper script [create-archive.sh](./scripts/create-archive.sh) to create an archive based on the next described steps.

You can then deploy that archive on your server with the helper script [configure-archive.sh](./scripts/configure_archive.sh) that will install it in the proper centreon folder.

## Dependencies

- Bash
- NodeJS + PNPM

## React

You first need to build the react frontend code.

For that you can go to the [src/react](src/react) folder and run the following commands

- `pnpm lint`
- `pnpm build`

Those commands will generate the `/src/static` folder containing the federated module

## Package

You now need to package your application within a folder with the name of the module (here centreon-dummy)
that should contain the content of the src directory (with the built dependencies).

## Deploy

You can now place this folder in your centreon central server at the `/usr/share/centreon/www/modules`
while being sure that the folder is readable by the **apache** user (or specific user that is used for your http server)

## Validate

You can now install the module through the **Extension Manager** on your centreon,
and all your pages and configuration should be executed
