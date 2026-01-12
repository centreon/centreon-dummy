<?php

//TODO Those values should be updated through build process instead of statically edited
$moduleName = "centreon-bootstrap-module";
$lastChanged = "2025-09-01";
$appVersion = "26.01.0";

$module_conf[$moduleName] = [
    // Short module's name. Must be equal to your module's directory name
    'name' => $moduleName,
    // Full module's name
    'rname' => 'Centreon Module Bootstrap ',
    // Module's version
    'mod_release' => $appVersion,
    // Additional information
    'infos' => 'This is a bootstrap module that demonstrates the possibilities of modules',
    // Allow your module to be uninstalled
    'is_removeable' => '1',
    // Module author's name
    'author' => "Michelin",
    // Stability of module.
    'stability' => 'unstable',
    // Last time module was updated.
    'last_update' => $lastChanged,
    // Release notes link, if any.
    // 'release_note' => 'https://docs.centreon.com/current/en/releases/centreon-os-extensions.html',
    // Images associated with this module.
    // 'images' => [
    //     'images/centreon.png',
    // ],
];

?>