#! /bin/bash
if [ $1 = 'latest' ]; then
  target_version=$(npm info node version);
else
  target_version=$1;
fi
node_version=$(node -v);
if [ ${node_version:1:2} = ${target_version:0:2} ]; then
  echo "Detected ${node_version}, satisfying ${target_version}. Executing command";
  eval $2;
else
  echo "NodeJS ${node_version} instead of latest (${target_version:0:1}) is detected. Skipping command";
fi
