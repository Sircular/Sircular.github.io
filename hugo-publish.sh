#!/bin/bash
# Publication script for hugo

# if ! git diff-index --quiet HEAD --; then
#     echo "You have uncommitted changes"
#     exit 1
# fi

# CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
# PUBLISH_BRANCH="master"

# if [ "$CURRENT_BRANCH" == "$PUBLISH_BRANCH" ]; then
#     echo "Please switch to development branch."
#     exit 1
# fi

rm -r public 2>/dev/null
echo "Building site..."
if ! hugo; then
    echo "Build failed."
    exit 1
fi
# prettify using tidy
echo "Postprocessing..."
if ! find public -name '*.html' -exec tidy -iqm -w 100 --preserve-entities yes --tidy-mark no {} \; ; then
    echo "Build failed."
    exit 1
fi
