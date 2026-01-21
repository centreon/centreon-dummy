# Documentation

A module is a folder that will be placed on the `www/modules` folder of a centreon **central** application.

> For example on **RedHat** platforms, it would be in `/usr/share/centreon/www/modules`

Once it is installed, you need to validate it's installation through the **Extension Manager** within the centreon central interface.

The module is usually split in two components. The [frontend](#backend) and the [backend](#backend) parts.

## Backend

This section of the module allows you to provide additionnal API capabilities to your module by integrating it within the Centreon api.

This is done by providing **PHP Symfony** code to be installed when the module itself is installed.

> This module doesn't support this feature yet.
> You can follow the old documentation at [centreon-dummy docs - Database](https://github.com/centreon-archive/centreon-dummy/tree/master?tab=readme-ov-file#backend-gear)

## Frontend

THe frontend is composed of many components that each serve a purpose.

### PHP Install scripts
Those are the PHP scripts executed during the "validation" of the module within the installation in the "extension manager". You can precise installation or uninstallation code.

This is usually used to help configure the [backend](#backend) configuration files.

### SQL Install scripts
Those scripts are **SQL** files that are also execute at installation and uninstallation phases of the module.

It can be used for any internal centreon database manipulation like creating / updating tables, but is especially used to append the frontend pages configuration.

### Upgrade scripts
The upgrade scripts are executed when the centreon central is being upgraded, as modules are independent from the central server, those scripts allow for an automatic may to run code when this happends

> This process is not described in this module. You can read more at [Centreon Docs - Create a module - Upgrade](https://docs.centreon.com/docs/developer/developer-module/)

### React Pages
The React pages are **microfrontend federated modules** that are exposed to be loaded within the Centreon application.

The application code is made as a simple react application but is bundled with specific configuration to be provided within a `/static` folder within the module so it can be loaded by centreon.

The federated module endpoints are also to be integrated within the centreon database **topology** table so an ID can refer to a specific path of the frontend module.
