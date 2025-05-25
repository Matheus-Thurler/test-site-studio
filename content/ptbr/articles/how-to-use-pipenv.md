---
title: How to Use pipenv
date: 11/02/2024
description: "Learn how to use Pipenv to manage Python project dependencies and virtual environments effortlessly. A step-by-step tutorial from installation to advanced usage.."
tags:
  - python
image: https://media-site-matheus-nuxt.s3.amazonaws.com/posts/pipenv/thumb/pipenv.jpeg
readingTime: "3"
---

![preview](https://media-site-matheus-nuxt.s3.amazonaws.com/posts/pipenv/thumb/pipenv.jpeg)
# Simplifique o Gerenciamento de Dependências em Python com Pipenv: Um Guia para Iniciantes 🐍✨

O gerenciador de pacotes padrão do Python, `pip`, é excelente para instalar pacotes. No entanto, quando se trata de gerenciar dependências específicas de projetos e ambientes virtuais, `pip` sozinho pode parecer um pouco básico. Desenvolvedores frequentemente se veem fazendo malabarismos entre `pip` e `virtualenv` (ou o módulo `venv` integrado do Python), criando ambientes manualmente, ativando-os por meio de scripts específicos e gerenciando arquivos `requirements.txt`.

É aqui que o **Pipenv** entra em ação! Pipenv é a "ferramenta de empacotamento Python oficialmente recomendada pela Python.org", projetada para trazer o melhor de todos os mundos de empacotamento para o desenvolvedor Python. Ele cria e gerencia automaticamente um ambiente virtual para seus projetos e gerencia as dependências do seu projeto em um `Pipfile` e `Pipfile.lock`, oferecendo um processo de compilação mais robusto e determinístico.

Vamos mergulhar em como você pode usar o Pipenv para otimizar seu fluxo de trabalho em Python.

## Por que escolher o Pipenv?

- **Ambientes Virtuais Integrados:** Chega de comandos `virtualenv` ou `venv` separados. O Pipenv gerencia a criação e o gerenciamento de ambientes virtuais automaticamente.
- **Builds Determinísticos:** `Pipfile.lock` garante que você obtenha as mesmas versões das dependências sempre, em diferentes ambientes.
- **Resolução de Dependências:** O Pipenv ajuda a resolver grafos de dependências complexos.
- **Separação Clara de Dependências:** `Pipfile` distingue entre dependências padrão e de desenvolvimento.
- **Segurança:** Ele pode verificar vulnerabilidades de segurança em suas dependências.

## Primeiros Passos: Instalando o Pipenv

Primeiro, você precisa instalar o Pipenv. Você pode fazer isso usando `pip`:

```shell
pip install pipenv
```

Geralmente, é recomendável instalar o Pipenv por usuário usando `pip install --user pipenv` para evitar potenciais conflitos com pacotes do sistema, garantindo que o diretório binário do usuário esteja no seu PATH.

## Inicializando seu Projeto com o Pipenv

1. **Navegue até o Diretório do Seu Projeto:**
Abra seu terminal e acesse a pasta do seu projeto existente ou crie uma nova:

```shell
mkdir meu-projeto-python
cd meu-projeto-python
```

2. **Comece a Usar o Pipenv:**
Você pode inicializar o Pipenv em um projeto de algumas maneiras:

- **Instalar um pacote:** Se você sabe com qual pacote deseja iniciar (por exemplo, `requests`), basta instalá-lo. O Pipenv criará automaticamente um `Pipfile` e um ambiente virtual.
```shell
solicitações de instalação do pipenv
```
- **Ative o shell:** Se você não quiser instalar um pacote ainda, mas quiser criar o ambiente e o `Pipfile`:
```shell
pipenv shell
```
Este comando criará um ambiente virtual para o seu projeto (geralmente em um local centralizado ou em uma pasta `.venv` dentro do seu projeto, se `PIPENV_VENV_IN_PROJECT` estiver definido) e o ativará.

_(Imagem Alt: Terminal mostrando o comando do shell pipenv criando um ambiente virtual e ativando-o, com Pipfile e Pipfile.lock aparecendo)_

Após a inicialização, você notará dois novos arquivos no diretório do seu projeto:

- `Pipfile`: Este arquivo substitui o tradicional `requirements.txt` e contém informações sobre as dependências diretas do seu projeto, a versão do Python e os códigos-fonte.
- `Pipfile.lock`: Este arquivo registra as versões exatas de todas as dependências (e subdependências) do seu projeto. Isso garante compilações determinísticas. **Você deve submeter `Pipfile` e `Pipfile.lock` ao controle de versão.**

Para aqueles familiarizados com Node.js, `Pipfile` é análogo a `package.json`, e `Pipfile.lock` é semelhante a `package-lock.json`.

## Gerenciando Dependências

### Instalando Pacotes

Para instalar um pacote e adicioná-lo ao seu `Pipfile`, use `pipenv install`:

```shell
pipenv install flask
```

Isso instalará o Flask e o adicionará à seção `[pacotes]` do seu `Pipfile` e atualizará `Pipfile.lock`.

_(Imagem Alt: Conteúdo do Pipfile mostrando o Flask adicionado na seção [pacotes])_

### Instalando Dependências de Desenvolvimento

Para pacotes necessários apenas para desenvolvimento (por exemplo, linters, frameworks de teste), use a flag `--dev`:

```shell
pipenv install pytest --dev
```

Eles serão adicionados à seção `[dev-packages]` no seu `Pipfile`.

### Desinstalando Pacotes

Para remover um pacote:

```shell
pipenv uninstall flask
```

### Atualizando Pacotes

Para atualizar todos os pacotes:

```shell
pipenv update
```

Para atualizar um pacote específico:

```shell
pipenv update <nome_do_pacote>
```

### Visualizando o Gráfico de Dependências

Para ver uma árvore de dependências do seu projeto:

```shell
pipenv graph
```

## Trabalhando com o Ambiente Pipenv

### Ativando o Shell do Ambiente Virtual

Como mostrado anteriormente, `pipenv shell` ativa o ambiente virtual do seu projeto. O prompt do seu terminal geralmente muda para indicar que você está dentro do ambiente virtual.

### Executando Comandos Sem Ativar o Shell

Se você deseja executar apenas um comando usando o ambiente virtual do projeto sem ativá-lo explicitamente,
