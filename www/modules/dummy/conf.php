<?php

/*
 * Copyright 2020 Centreon (http://www.centreon.com/)
 *
 * Centreon is a full-fledged industry-strength solution that meets
 * the needs in IT infrastructure and application monitoring for
 * service performance.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,*
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

$moduleName = 'dummy';
$module_conf[$moduleName] = [
    // Short module's name. Must be equal to your module's directory name
    'name' => $moduleName,
    // Full module's name
    'rname' => 'Dummy Example Module',
    // Module's version
    'mod_release' => '21.04',
    // Additional information
    'infos' => 'This module is a skeleton',
    // Allow your module to be uninstalled
    'is_removeable' => '1',
    // Module author's name
    'author' => 'Centreon',
    // Stability of module.
    'stability' => 'stable',
    // Last time module was updated.
    'last_update' => '2020-12-01',
    // Release notes link, if any.
    'release_note' => 'https://docs.centreon.com/current/en/releases/centreon-os-extensions.html',
    // Images associated with this module.
    'images' => [
        'images/centreon.png',
    ],
];
