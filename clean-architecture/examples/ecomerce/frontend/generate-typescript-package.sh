

echo "-----------------------------"
echo "|Generate typescript package |"
echo "-----------------------------"

FOLDER_NAME=core
PACKAGE_NAME=core
DIR=./

if [ -z "$1" ]
then
    echo "Folder name cannot be empty"
    exit 1
else
    FOLDER_NAME=$1
fi

if [ -z "$2" ]
then
    echo "Package name cannot be empty"
    exit 1
else
    PACKAGE_NAME=$2
fi


if [ -z "$3" ]
then
    echo "DIR"
    exit 1
else
    DIR=$3
fi

echo "Start setup project: "
mkdir test
mkdir ./$DIR/$FOLDER_NAME
cd ./$DIR/$FOLDER_NAME

# Generate files
mkdir src
touch src/index.ts
touch README.md

echo "Init node package"
cp ../../templates/default-package.json package.json
json -I -f package.json -e "this.name='$PACKAGE_NAME'"

echo "Init tsconfig.json"
cp ../../templates/default-tsconfig.json tsconfig.json

echo "Init .gitignore"
cp ../../templates/default-gitignore .gitignore

echo "npm install"
npm i

echo "-------FINSH TO CREATE $FOLDERNAME-------"
exit 0