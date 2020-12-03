# Centreon Dummy Module

A dummy module in order to explain how to create your own module

## Installation

Currently, Centreon modules are stored in `/usr/share/centreon/www/modules/<module_name>`.
So, to use this dummy module, copy the module folder in the proper folder :
```shell
cp -R www/modules/dummy /usr/share/centreon/www/dummy
```

Module configuration can be updated in `www/modules/dummy/conf.php`.
This file is properly commented to know how to fill it.
Main properties are the name and the version (mod_release).

If you need to manipulate the database during module installation or deletion, you can insert directly the queries in the following files :
* www/modules/dummy/sql/install.sql
* www/modules/dummy/sql/uninstall.sql

If you need to do advanced manipulation during module installation or deletion, you can write php script in the following files :
* www/modules/dummy/php/install.php
* www/modules/dummy/php/uninstall.php


## Frontend

Frontend code is stored in `frontend` folder.

Dependencies can be installed using following command :
```shell
npm install
```
> :warning: **If you are using nodejs 14**, use `npm install --legacy-peer-deps`

Frontend components can be built using following command :
```shell
npm run build
```

There are two concepts in Centreon to integrate module frontend :
* **Page**
* **Hook**

### Page

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

### Hook

A hook is used to integrate a react component in a specific location of centreon-web.
Currently, the only available location is the top counter.

To do this, you need to build a js file inside following directory : `/usr/share/centreon/www/modules/dummy/static/hooks/header/topCounter/`
webpack file contains already a configuration to build a hook : https://github.com/centreon/centreon-dummy/blob/master/frontend/webpack.config.js#L17

## Backend

Backend code used to generate api is stored in `backend` folder
