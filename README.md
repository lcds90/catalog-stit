# ST IT Cloud - Development Test LV. 3
<div align="center">

> API desenvolvida em Node JS para processo seletivo na ST IT Cloud.

<img src="https://lirp.cdn-website.com/2f49c5f7/dms3rep/multi/opt/Prancheta-1-640w.png" alt="drawing" width="200"/>

## Sumário:
[Sobre](#about) |
[Rotas da aplicação](#routes) |
[Regras de negócio](#rules) |
[Informações](#informations)

</div>

* * *
## :bookmark_tabs: Sobre o projeto <a name="about"></a>

Nesse projeto foi desenvolvido uma **API** utilizando **Node**.
Onde como dados a API disponibiliza um catalogo interno de produtos, onde os vendedores possam consultar e buscar os produtos os quais tem permissão para ver, fazendo verificação se estão autenticados no sistema para a consulta.
A aplicação está hospedada no serviço do heroku, através de deploy automatizado com sistema tendo origem de um arquivo main.yml em workflows para a realização do deploy.

<h3 align="center">

:globe_with_meridians: [Deploy](https://api-catalog-list.herokuapp.com/)

</h3>


* * *

## :warning: Rotas da Aplicação <a name="routes"></a>

A porta que a aplicação em localhost recebe as solicitações é 5000 conforme o arquivo ```src/server.ts```, somente em caso de não estar configurando com variável de ambiente.

### POST

- ```/login```
> Autenticação de usuário
A autenticação necessita dos campos:
```email```: string
```password```: string
como paramêtros para processar a solicitação

#### Status

* ```200``` :green_circle: Devolve token como resposta e visualização de catalogo na rota ```/products```


* ```400``` :red_circle: Devolve mensagem de erro ao solicitante

* * *

### GET

- ```/products```
> Busca todos os produtos

#### Status

* ```200``` :green_circle: Devolve token como resposta e visualização de catalogo na rota ```/products```


* ```400``` :red_circle: Devolve mensagem de erro ao solicitante

* * *

- ```/products/:organizationName```
> Busca todos os produtos de organização especifíca

#### Status

* ```200``` :green_circle: Devolve token como resposta e visualização de catalogo na rota ```/products```


* ```400``` :red_circle: Devolve mensagem de erro ao solicitante

* * *

- ```/products/:organizationName?tags=<tag1><tag2>```
> Busca todos os produtos de organização e especifica devolve todos os itens que contenha as tags descritas.

#### Status

* ```200``` :green_circle: Devolve token como resposta e visualização de catalogo na rota ```/products```


* ```400``` :red_circle: Devolve mensagem de erro ao solicitante

* * *
## :large_blue_circle: Regras de Negócio <a name="rules"></a>

- [x] Autenticação
    - [x] Implementacão de JWT.
    - [x] Usuário recebe token como resposta em acesso validado
    - [x] Usuário recebe resposta de erro em acesso negado
    - [x] Se julgar necessário manter sessão, deve ser feito de forma independente de server.

- [ ] Níveis de acesso ao entrar na rota GET:
    - [ ] senior - level 0, 1 e 2
    - [ ] middle - level 1 e 2
    - [ ] junior - level 2
    - [ ] intern - level 0, 1 e 2, porém somente sob a organization STUFF A

- [ ] Os dados do arquivo `products.txt` não deve ser carregado de forma integral em memória. SUGESTÃO: Utiliza streams.

- [x] A API deve ser escalável horizontalmente.

- [ ] Manual de instalacão de execucão da API, incluindo as dependências de libs, runtimes, e etc.

- [ ] Testes
    - [ ] Auth User
    - [ ] Get Products

* * *
## :books: Informações <a name="informations"></a>

#### :rocket: Execução

```yarn dev```
> Para rodar o projeto localmente .

```yarn start```
> Automatizado para produção juntamente com o arquivo Procfile para o deploy no serviço de hospedagem do heroku.

* * *

#### :gear: Bibliotecas

1.  [Yarn](https://yarnpkg.com/): Gerenciador de depedências do projeto utilizado.
1.  [Express](https://expressjs.com/pt-br/): Framework para escalar API e realizar requisições.
1.  [Json Web Token](https://jwt.io/): Biblioteca responsável pela realização de autenticação. 
1.  [ts-node/ts-node-dev](https://www.npmjs.com/package/ts-node): Como é utilizado typescript no projeto, ela realiza a execução diretamente em Node, sem a necessidade de pré compilar o código. 
1.  [ts-configpaths](https://www.npmjs.com/package/tsconfig-paths): No projeto é utilzado rotas personalizadas como pode se conferir no arquivo ```tsconfig.json```, ela realiza a relação do caminho para validação de encontrar os caminhos solicitados dos arquivos.
1.  [uuidv4](https://www.npmjs.com/package/uuidv4): Biblioteca responsável pela geração de IDs dinâmicos para os produtos.
1.  [es-dirname](https://www.npmjs.com/package/es-dirname): Para utilização de streams, é necessário a utilização do new URL(import.meta.URL), porém nas configurações aonde o projeto está configurado com os padrões do ES6, e o tipo de módulo como CommonJS, não consigo utilizar o es2020, esnext ou system devido a utilização de arquivos json, porém essa biblioteca conseguiu suprir a necessidade da relação mais próxima com essa função. 
1.  [@babel/...](https://babeljs.io/): Transpilador do typescript para javascript para execução geral.
1.  @types...: Facilitador de sugestão de códigos de respectiva biblioteca.
1.  [Jest/ts-jest](https://jestjs.io/pt-BR/): Framework responsável pela parte de testes na aplicação, ts-jest é a biblioteca com suporte para typescript.
1.  [supertest](https://www.npmjs.com/package/supertest): Biblioteca responsável pela chamadas HTTP na área de testes, sem a necessidade do servidor estar incializado.
1.  [Typescript](https://www.typescriptlang.org/): Conjunto de ferramentas e formas mais eficientes de escrever código JavaScript,.

* * *
### :file_folder: Estrutura do Projeto

A estrutura da aplicação está baseada no conceito de [SOLID](https://www.youtube.com/watch?v=vAV4Vy4jfkc).
Onde os UseCases são totalmente idenpendentes da parte da arquitetura da aplicação, tendo somente como necessário realizar a mudança da implementação na pasta de repositórios.
#### :open_file_folder: entities
> ./src/entities

#### :open_file_folder: repositories
> ./src/repositories

#### :open_file_folder: routes
> ./src/routes

#### :open_file_folder: useCases
> ./src/useCases

#### :globe_with_meridians: arquivos

##### :small_blue_diamond: app.ts
> ./src/app.ts

##### :small_blue_diamond: server.ts
> ./src/server.ts
