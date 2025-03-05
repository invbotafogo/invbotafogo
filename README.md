# Home-Page
Site estático da Igreja Nova Vida de Botafogo.

# Como executar o site em dev?
Para servir o site em dev precisamos do programa [npm](https://nodejs.org).

Podemos seguir a [doc oficial](https://nodejs.org/en/download)  e baixar o arquivo para o nosso sistema.

No Windows
```
Baixe o pacote .msi no site e execute a instalação.
```

No Mac OS
```
Baixe o pacote .pkg no site acima e execute a instalação.
```

No Linux
```
Baixe o arquivo .xz e extraia no diretório desejado e configure no path do sistema.
```

Após instalar o nvm basta executar o comando: 
```
nvm install node
```

Também podemos utilizar a instalação do nvm via script de instalação https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script

Após instalar o npm precisamos instalar as dependências:
```
npm install
```

Para executar o site em localhost:8080 basta executar o comando:
```
npm run dev
```

Para empacotar os arquivos do site basta executar o comando:
```
npm run build
```
