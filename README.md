# Centreon Dummy Module

A dummy module in order to explain how to create your own module

## Quick Start :rocket:

```shell
cp -R www/modules/dummy /usr/share/centreon/www/modules/dummy
chown -R apache. /usr/share/centreon/www/modules/dummy

cp -R backend/config /usr/share/centreon/config
cp -R backend/src /usr/share/centreon/src
su - apache -s /bin/bash -c "/usr/share/centreon/bin/console cache:clear"

cd frontend
npm install # or npm install --legacy-peer-deps if you are using npm v7
npm run build
rm -rf /usr/share/centreon/www/modules/dummy/static
cp -R www/modules/dummy/static /usr/share/centreon/www/modules/dummy/static
```

Then, go to the Centreon UI in `Administration > Extensions > Manager` and install the dummy extension.

A new counter will appear in the top bar, and a new menu is accessible in `Home > Dummy Menu Entry`

## Installation :pick:

Currently, Centreon modules are stored in `/usr/share/centreon/www/modules/<module_name>`.
So, to use this dummy module, copy the module folder in the proper folder :
```shell
cp -R www/modules/dummy /usr/share/centreon/www/dummy
chown -R apache. /usr/share/centreon/www/dummy
```

Module configuration can be updated in `www/modules/dummy/conf.php`.
This file is properly commented to know how to fill it.
Main properties are the name and the version (mod_release).

If you need to manipulate the database during module installation or deletion, you can insert directly the queries in the following files :
* **www/modules/dummy/sql/install.sql**
* **www/modules/dummy/sql/uninstall.sql**

If you need to do advanced manipulation during module installation or deletion, you can write php script in the following files :
* **www/modules/dummy/php/install.php**
* **www/modules/dummy/php/uninstall.php**

## Frontend :sparkles:

Frontend code is stored in `www/modules/dummy/react` folder.
  > :memo: You have to install NodeJS 16

Dependencies can be installed using following command :
```shell
npm ci
# or
npm ci --legacy-peer-deps
```

Frontend components can be built using following command :
```shell
npm run build # production build
npm run start:dev # development build with watch mode
```

Don't forget to run ESLint
```shell
npm run eslint:fix
```

There are two concepts in Centreon to integrate module frontend :
* **Page**
* **Hook**

Each of those concepts corresponds to a React component.
Centreon Web will load dynamically those components using [systemjs](https://github.com/systemjs/systemjs).

You can include your own dependencies in package.json and use it in your components.
There are no limitation, cause your react component will be managed as a totally separated bundle.

### Page :page_facing_up:

A page is used to integrate a module page to as react component to centreon-web.

The directory structure corresponds to the page route.
Example: `/usr/share/centreon/www/modules/dummy/static/pages/home/dummy/index.js` will be accessible on following route : `<centreon_url>/home/dummy`

webpack file contains already a configuration to build a hook : https://github.com/centreon/centreon-dummy/blob/master/frontend/webpack.config.js#L16

If you want the page to be accessible using left menu, you need to insert topology in database.
An example is given here : https://github.com/centreon/centreon-dummy/blob/master/www/modules/dummy/sql/install.sql#L7-L8
* **topology_name** : menu entry
* **topology_parent** : parent menu (1 = home, 2 = monitoring, 3 = reporting, 5 = admnistration, 6 = configuration)
* **topology_page** : page number (must be unique, contain 3 numbers and should begin by the number of its parent. ex: 111 if the parent is home)
* **topology_order** : page priority (if the entry will be at the top or bottom when opening the menu)
* **topology_group** : menu group (sublevel menus can be grouped)
* **topology_url** : route url (ex: /home/dummy)
* **topology_url_opt** : optional query parameters (not especially used)

![Listing](/doc/images/listing.png)

### Hook :magnet:

A hook is used to integrate a react component in a specific location of centreon-web.
Currently, the only available location is the top counter.

To do this, you need to build a js file inside following directory : `/usr/share/centreon/www/modules/dummy/static/hooks/header/topCounter/`
webpack file contains already a configuration to build a hook : https://github.com/centreon/centreon-dummy/blob/master/frontend/webpack.config.js#L17

![Top Counter](/doc/images/top_counter.png)

## Backend :gear:

Backend code used to generate api is stored in `backend` folder.
The framework which is used is Symfony. Please refer to the [documentation](https://symfony.com/doc/current/index.html) to get more explanation about configuration and implementation.

`backend/config` files contain configuration files to manage :
* global configuration : `backend/config/packages/prod/CentreonDummy.yaml` (extensions, autoload, dependency injection...)
* serialization : `backend/config/packages/serializer/CentreonDummy/` (used in Controller to serialize data before sending response)
* api routes : `backend/config/routes/CentreonDummy.yaml`
  > :warning: routes are linked to the file `www/modules/dummy/routes/CentreonDummy.yaml`
  >
  > during module installation, content of `www/modules/dummy/routes/CentreonDummy.yaml.wait` is copied to `www/modules/dummy/routes/CentreonDummy.yaml` in order to add the new routes to the configuration

Backend configuration files must be copied to `/usr/share/centreon/config`.

> :warning: when configuration files are updated on Centreon server, it is mandatory to reload symfony cache :
> ```shell
> su - apache -s /bin/bash -c "/usr/share/centreon/bin/console cache:clear"
> ```

`backend/src` files contain api implementation :
* controllers which are the entrypoints of the api : `backend/src/CentreonDummy/Application/Controller/DummyController.php`
* services which are called by the controller and contain the business logic : `backend/src/CentreonDummy/Domain/*`
* repositories which interact with external components like the database : `backend/src/CentreonDummy/Infrastructure/DummyRepositoryRDB.php`

Backend source files must be copied to `/usr/share/centreon/src`.
