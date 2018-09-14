#!/bin/bash


#read -p "aperte qualquer tecla" v && exit
installNodemon(){
    echo -e "\e[91mNodemon não instalado" 
    echo -e "\e[93mInstalando nodemon, aguarde..." 
    npm install -g nodemon > /dev/null 2>&1 
    nodemon -v > /dev/null 2>&1
    [[ $? -ne 0 ]] && echo -e "\e[91mNodemon não instalado" && installNodemon|| echo -e "\e[92mNodemon instalado com sucesso!"
}


echo ""
echo -e "Verificado se você possui o nodemon"
echo ""
nodemon -v > /dev/null 2>&1     
[[ $? -ne 0 ]] && installNodemon || echo -e "\e[92mNodemon já instalado"
echo ""
echo -e "\e[0mVerificado outras dependências do projeto.."
echo ""
cd backend

if [ -d node_modules ]
then 
    echo -e "\e[92mTodas as dependências já estão instaladas"
    echo -e "\e[92mIrei subir o servidor"
    echo -e "\e[0m"
    echo -e ""
else 
    echo -e "\e[91mDependências não estão instaladas"
    echo -e "\e[93mInstalando dependências, aguarde..."
    npm install --save > /dev/null 2>&1 
    echo -e "\e[92mTodas as dependências já estão instaladas\nIrei subir o servidor"
    echo -e "\e[0m"
    echo -e ""
fi

nodemon index.js

