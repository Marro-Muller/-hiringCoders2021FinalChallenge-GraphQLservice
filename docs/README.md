<br>
<p align="center">
    <img style='padding: 8px;' src="https://appliancetheme.vtexassets.com/assets/app/src/vtex___751a9fb5b8e275bc4526ef358279243b.svg" alt="VTEX" width="200">
</p>
<p align="center">
    <img style='padding: 8px;' src="https://assets.website-files.com/5ff79f3ebebf6b12f6b7747f/5ffe04fc6284b7e90070d985_logo-gama-academy-p-500.png" alt="Gama-Academy" width="200">
</p>
<br>
<h1 align="center">
Serviço para Leads VTEX-AWS
</h1>

<p align="center">Serviço customizado da VTEX para interação com API AWS</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<p align="center">
  <a href="#o-serviço">O Serviço</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#recursos">Recursos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#queries-e-mutations">Queries e Mutations</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#integração">Integração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#repositórios-relacionados">Repositórios relacionados</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

---

## O Serviço
O serviço, que foi desenvolvido durante a terceira fase do programa Hiring Coders #2 como parte do [desafio](#) proposto, é responsável pela troca de dados entre os blocos de front-end customizados no VTEX IO e a API desenvolvida na AWS (repositório da API  [aqui](#)).

Com ele é possível, através do bloco de formulário [#](#), salvar dados capturados referentes a um lead em um banco de dados na AWS e recuperar uma lista com todos os leads já cadastrados, além de atualizar e deletar um lead específico.

Dentro da nuvem da VTEX os blocos se comunicam com o serviço utilizando GraphQL e o serviço, por sua vez, através de um ExternalClient se conecta a API na AWS utilizando REST.
<br><br>

## Recursos

- <img src="https://i.ibb.co/KD1sgdY/vtex-icon.png" width=16/> **VTEX IO** - Plataforma nativa capaz de ajudar a entrega de soluções de negócio com mais agilidade e segurança.
- <img src="https://graphql.org/img/logo.svg" width=16/> **GraphQL** -  Linguagem de consulta e ambientes de execução voltado a servidores para APIs que permite extrair dados de várias fontes em uma única chamada.
<br><br>

## Queries e Mutations

### Queries
#### **lead**
```graphql
{
  lead (email: "teste@email") {
    statusCode
    body {
      id
      email
      type
    }
  }
}
```
Passando o email como parâmetro recupera-se os dados do lead específico.

#### **leads**
```graphql
{
  leads {
    statusCode
    body {
      id
      email
      type
      clientAt
      leadAt
    }
  }
}
```
A query retorna uma lista com todos os leads cadastrados.
<br><br>

### Mutations
#### **newLead**
```graphql
mutation { 
  newLead(lead:{
    name: "Test"
    email: "test@email.com"
    phoneNumber: "23137463251"
    type: "lead" 
  }) {
    statusCode
    body
  }
}
```
Cadastra um novo lead

#### **editLead**
```graphql
mutation {
  editLead(lead: {
    name: "Test"
    email: "test@email.com"
    phoneNumber: "23137463251"
  }) {
    statusCode
    body
  }
}
```
Altera dados do lead. O email é utilizado como chave de busca e não pode ser alterado.

#### **deleteLead**
```graphql
mutation {
  deleteLead(email: "test@email.com"){
    statusCode
    body
  }
}
```
Deleta o registro com o email indicado
<br><br>

## Integração
Essa é uma sugestão de como integrar blocos customizados do VTEX IO e o serviço em GraphQL utilizando o react-apollo.

Adicione o serviço ao seu manifest.json do bloco.
```diff
dependencies: {
  ...
+ "hiringcoders202125.leadvtex25": "0.x"
}
```
O serviço precisa estar rodando no mesmo workspace do bloco, e o nome deve ser alterado para o vendor correto.

No diretório *react* do bloco, crie uma nova pasta *queries* onde ficarão as queries e mutations em GraphQL.
```
.
|-- react
|     |-- queries
|             |-- getLead.graphql
|             |-- ...
```
Em cada arquivo .graphql escreva a query ou mutation correspondente.
```graphql
query GET_LEADS{
    leads {
        body {
            id
            name
            email
            type
        }
    }
}
```
*Outros campos retornados para o lead pode ser encontrado da schema.graphql


Por fim, no corpo do bloco faça a chamada da query ou mutation
```typescript
import { useQuery } from 'react-apollo'
import GET_LEADS from './getLeads.graphql'
...
const { loading, error, data, refetch } = useQuery<queryData>(GET_LEADS, 
      {
          ssr: false
      })

  if (loading) console.log('Loading...')
  if (error) console.log(`Error ${error}`)
  console.log(data);

  return (
      <>
          <button onClick={() => refetch()}>Atualizar</button>
          <ul>
              {!loading && (data && data.leads.body.map((l: leadData, idx: number) => {
                  return (
                      <li key={idx}>{l.email} | {l.type}</li>
                  )
              }))}
          </ul>
      </>
  )
...
```

## Repositórios relacionados

- [Hiring Coders #2 Terceira Fase- Desafio Final](https://github.com/victorhgadioli/hiringcoders2021-finalChallenge-main)
- [Loja](https://github.com/victorhgadioli/hiringcoders2021-finalChallenge)
- [Formulário de cadastro de lead](https://github.com/victorhgadioli/hiringcoders2021-finalChallenge-leadFormBlock)
- [Tabela de leads](https://github.com/victorhgadioli/hiringcoders2021-finalChallenge-leadTableBlock)
- [API de leads na AWS](https://github.com/victorhgadioli/hiringcoders2021-finalChallenge-AWS-API)
- [VTEX Hook](https://github.com/victorhgadioli/hiringcoders2021-finalChallenge-VTEX-Hook)