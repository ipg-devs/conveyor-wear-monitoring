#! /bin/bash

if $RUN_RELEASE ; then
  echo "Setting up DB"
  node ./scripts/db.js
fi

exit 0;