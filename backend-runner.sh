#!/bin/bash

echo ""
echo ""
if [ -d backend/node_modules ]
then
    echo -e "\e[92mTodas as dependências já estão instaladas"
    echo -e "\e[92mIrei subir o servidor"
    echo -e "\e[0m"
    cd backend
    echo -e ""
    node index.js
else 
    echo -e "\e[91mDependências não estão instaladas"
    echo -e ""
    echo -e "\e[93mInstalando dependências, aguarde..."
    cd backend
    echo -e "\e[0m"
    npm install --save > /dev/null 2>&1 
    echo -e "\e[92mTodas as dependências já estão instaladas\nIrei subir o servidor"
    echo -e "\e[0m"
    echo -e ""
    node index.js
fi
