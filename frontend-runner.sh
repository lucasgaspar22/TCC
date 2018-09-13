#!/bin/bash

echo ""
echo ""
if [ -d tcc-front-end/node_modules ]
then
    echo -e "\e[92mTodas as dependências já estão instaladas"
    echo -e "\e[92mIrei subir a aplicação \e[91mAngular 6"
    echo -e "\e[0m"
    cd tcc-front-end
    echo -e ""
    ng serve --open
else 
    echo -e "\e[91mDependências não estão instaladas"
    echo -e ""
    echo -e "\e[93mInstalando dependências, aguarde..."
    cd tcc-front-end
    echo -e "\e[0m"
    npm install --save > /dev/null 2>&1 
    echo -e "\e[92mTodas as dependências já estão instaladas\nIrei subir a aplicação \e[91mAngular 6"
    echo -e "\e[0m"
    echo -e ""
    ng serve --open
fi