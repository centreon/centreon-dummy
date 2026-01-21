#!/usr/bin/env bash

# Functions

# FN fatal_error
# Description: display error message then exits 1
# arg1: message
fatal_error(){
    local message="$1"
    echo "[fatal] $message" >&2
    exit 1
}

# Globals
archive_path=$1
archive_filename=$(basename "$archive_path")
# We expect the folder to be the same as the archive
archive_folder=${archive_filename%.tar.gz}
# Can be specific per OS
module_destination=/usr/share/centreon/www/modules
module_destination_path="${module_destination:?}"/"$archive_folder"
destination_user=apache
destination_group=apache

# Main

if ! [ -f "$archive_path" ]; then
    fatal_error "Unable to find archive"
fi

if (( "$(id -u)" != 0 )); then
    fatal_error "Script is not run by root, we need it to move the folder and give it proper permission"
fi

if ! tar -xvf "$archive_path" > /dev/null; then
    fatal_error "Unable to extract archive"
fi

if ! [ -d "$archive_folder" ]; then
    fatal_error "Unable to find archive folder '$archive_folder', ensure you made a valid archive"
fi

if [ -d "$module_destination_path" ]; then
    echo "Existing module at centreon, removing"
    
    if ! rm -rf "$module_destination_path"; then
        fatal_error "Unable to remove previous module"
    fi
fi

if ! mv "$archive_folder" "$module_destination/"; then
    fatal_error "Unable to move archive folder to centreon module folder"
fi

if ! chown -R "$destination_user":"$destination_group" "$module_destination_path"; then
    fatal_error "Unable to move archive folder to centreon module folder"
fi

echo Done