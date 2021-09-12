#!/usr/bin/env bash
##
#   Rebuild JS project with modules being placed to inner folders.
##
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../" && pwd)}
DIR_NODE="${DIR_ROOT}/node_modules"
DIR_OWN="${DIR_ROOT}/own_modules"

echo "Remove installed dependencies and lock file."
rm -fr "${DIR_NODE}" "${DIR_ROOT}/package-lock.json"

echo "Re-install JS project."
cd "${DIR_ROOT}" || exit 255
npm install

echo "Remove cloned dependencies (sources)."
#rm -fr "${DIR_OWN}/@flancer64"
#rm -fr "${DIR_OWN}/@teqfw"

echo "Clone dependencies from github to inner folders."
mkdir -p "${DIR_OWN}/@flancer64/"
mkdir -p "${DIR_OWN}/@teqfw/"
git clone git@github.com:flancer64/habr_dem_user_link.git "${DIR_OWN}/@flancer64/habr_dem_user_link"
git clone git@github.com:flancer64/habr_dem_user_pwd.git "${DIR_OWN}/@flancer64/habr_dem_user_pwd"
git clone git@github.com:teqfw/core.git "${DIR_OWN}/@teqfw/core"
git clone git@github.com:teqfw/db.git "${DIR_OWN}/@teqfw/db"
git clone git@github.com:teqfw/di.git "${DIR_OWN}/@teqfw/di"

echo "Remove node modules and link cloned sources."
rm -fr "${DIR_NODE}/@flancer64/habr_dem_user_link" && ln -s "${DIR_OWN}/@flancer64/habr_dem_user_link" "${DIR_NODE}/@flancer64/habr_dem_user_link"
rm -fr "${DIR_NODE}/@flancer64/habr_dem_user_pwd" && ln -s "${DIR_OWN}/@flancer64/habr_dem_user_pwd" "${DIR_NODE}/@flancer64/habr_dem_user_pwd"
rm -fr "${DIR_NODE}/@teqfw/core" && ln -s "${DIR_OWN}/@teqfw/core" "${DIR_NODE}/@teqfw/core"
rm -fr "${DIR_NODE}/@teqfw/db" && ln -s "${DIR_OWN}/@teqfw/db" "${DIR_NODE}/@teqfw/db"
rm -fr "${DIR_NODE}/@teqfw/di" && ln -s "${DIR_OWN}/@teqfw/di" "${DIR_NODE}/@teqfw/di"

echo "Done."
