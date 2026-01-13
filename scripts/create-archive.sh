#!/usr/bin/env bash
# Will create an archive to extract on the centreon server

# Globals
ROOT_DIR=$(realpath "$(dirname "$0")/..")
BUILD_DEV=${BUILD_DEV:=0}
# Module name must not contains slashes
MODULE_NAME=centreon-bootstrap-module

# Functions

# FN fatal_error
# Description: display error message then exits 1
# arg1: message
fatal_error(){
    local message="$1"
    echo "[fatal] $message" >&2
    exit 1
}

# Main
echo going to react folder
if ! cd "$ROOT_DIR"/src/react; then
    fatal_error "Unable to go in react folder"
fi

echo install dependencies
if ! pnpm install; then
    fatal_error "Installing dependencies failed"
fi

echo run build
build_command="pnpm build"
if ((BUILD_DEV == 1)); then
    echo "warn: building in dev mode"
    build_command="pnpm build:dev"
fi
if ! $build_command; then
    fatal_error "Unable to build react"
fi

echo going back to main folder
if ! cd "$ROOT_DIR"/; then
    fatal_error "Unable to go back in main project"
fi

echo Create archive within the module name folder

archive_name="$MODULE_NAME"
archive_name="$archive_name".tar.gz

# We have to use the transform to place every file in the proper folder as it is sensitive for some files
transform_query='s,^,'"$MODULE_NAME"'/,'
if ! tar -c -z \
    -f "$archive_name" \
    -C src \
    --transform="$transform_query" \
        php \
        php_pages \
        sql \
        static \
        upgrade \
        conf.php \
;then
    fatal_error "Unable to create archive"
fi

echo Done
echo Archive available at "$archive_name"
