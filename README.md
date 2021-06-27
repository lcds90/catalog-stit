# ST IT Cloud - Development Test LV. 3
> Projeto de API desenvolvido em Node, disponível em: https://api-catalog-list.herokuapp.com/

## Sumário:
- [Sobre](#about)
- [Rotas e Regras](#routesandrules)
- [Conceitos](#concepts)

<hr>
<h2>:checkered_flag: Sobre o projeto </h2> <a name="about"></a>

### Resumo do projeto

Nesse projeto foi desenvolvido uma **API** utilizando **Node**.
Onde como dados a API disponibiliza um catalogo interno de produtos, onde os vendedores possam consultar e buscar os produtos os quais tem permissão para ver, fazendo verificação se estão autenticados no sistema para a consulta.

<hr>

<h3>:flags: Rotas da Aplicação </h3> <a name="routesandrules"></a>

<details>
<summary>Expandir</summary>

#### Rotas da Aplicação

A porta que a aplicação em localhost recebe as solicitações é 5000 conforme o arquivo ```src/server.ts```, somente em caso de não estar configurando com variável de ambiente.

##### POST

- ```/login```
> Autenticação de usuário
A autenticação necessita dos campos:
```email```: string
```password```: string
como paramêtros para processar a solicitação

Status 200 :heavy_check_mark: - Devolve token como resposta e visualização de catalogo na rota ```/products```

Status 400 :x: - Devolve mensagem de erro ao solicitante

<hr>

##### GET

- ```/products```
> Busca todos os produtos


<hr>

- ```/products/:organizationName```
> Busca todos os produtos de organização especifíca

<hr>

- ```/products/:organizationName?tags=<tag1><tag2>```
> Busca todos os produtos de organização e especifica devolve todos os itens que contenha as tags descritas.

</details>

<h3>:no_entry_sign: Regras de Negócio </h3> <a name="routesandrules"></a>

<details>
<summary>Expandir</summary>

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

</details>

<hr>
<h2>:pencil: Conceitos aplicados </h2> <a name="concepts"></a>

### :file_folder: Estrutura do Projeto

A estrutura da aplicação está baseada no conceito de [SOLID](https://www.youtube.com/watch?v=vAV4Vy4jfkc), onde os UseCases são totalmente idenpendentes da parte da arquitetura da aplicação, tendo somente como necessário realizar a mudança da implementação na pasta de repositórios.