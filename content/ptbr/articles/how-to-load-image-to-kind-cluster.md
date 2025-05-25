---
title: Load Docker Images into Your Kind Kubernetes Cluster
date: 22/02/2025
description: A step-by-step guide on how to build Docker images and load them into your local Kind (Kubernetes in Docker) cluster for testing and development.
tags:
  - kind
  - kubernetes
image: https://media-site-matheus-nuxt.s3.amazonaws.com/kind.jpeg
readingTime: "10"
---

# Carregue facilmente imagens do Docker no seu cluster Kind Kubernetes 🐳⚙️

O Kind (Kubernetes no Docker) é uma ferramenta fantástica para executar clusters Kubernetes locais usando "nós" de contêineres Docker. É incrivelmente útil para testar seus aplicativos em contêineres e configurações do Kubernetes antes de implantá-los em um ambiente de produção. Uma tarefa comum é colocar suas imagens Docker personalizadas neste cluster Kind local.

Hoje, vou guiá-lo pelo processo passo a passo, desde a instalação do Kind e do `kubectl` até a criação de uma imagem Docker e seu carregamento no seu cluster Kind.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em seu sistema Linux:

1. **Docker**: O Kind usa o Docker para executar os nós do Kubernetes. Se você não o tiver, instale-o primeiro. Você pode encontrar instruções no [site oficial do Docker](https://docs.docker.com/engine/install/).

2. **Curl** (geralmente pré-instalado na maioria das distribuições Linux).

## Etapa 1: Instalar o Kind

Primeiro, vamos instalar o Kind. Estes comandos baixam o binário apropriado para a arquitetura do seu sistema e o movem para o diretório local de binários.

```bash
# Para AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind [https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64](https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64)
# Para ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind [https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-arm64](https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-arm64)

chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

_Observação: `v0.23.0` é usado aqui como exemplo. Você pode verificar a [página de lançamentos do Kind](https://github.com/kubernetes-sigs/kind/releases) para obter a versão mais recente e atualizar a URL conforme necessário._

Verifique a instalação:

```bash
versão do Kind
```

## Etapa 2: Instalar `kubectl`

`kubectl` é a ferramenta de linha de comando para interagir com clusters do Kubernetes, incluindo o seu cluster Kind.

1. **Baixe a versão estável mais recente do `kubectl`:**
```bash
curl -LO "[https://dl.k8s.io/release/$(curl](https://dl.k8s.io/release/$(curl) -L -s [https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl](https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl)"
```
2. **Torne o binário `kubectl` executável:**
```bash
chmod +x ./kubectl
```
3. **Mova o binário para o seu PATH:**
```bash
sudo mv ./kubectl /usr/local/bin/kubectl
```
4. **Verifique o instalação:**
```bash
kubectl version --client
```

## Etapa 3: Crie sua imagem Docker

Agora, você precisa de uma imagem Docker para carregar no seu cluster Kind. Se você tiver um `Dockerfile` para sua aplicação, navegue até o diretório que contém seu `Dockerfile` e execute:

```bash
# Substitua 'my-custom-app:1.0.0' pelo nome e tag da imagem desejados
docker build -t my-custom-app:1.0.0 .
```

Este comando cria uma imagem Docker usando o `Dockerfile` no diretório atual (`.`) e a marca como `my-custom-app:1.0.0`. Certifique-se de que esta imagem esteja disponível localmente na sua máquina onde o Docker está sendo executado.

## Etapa 4: Crie um cluster Kind (se você não tiver um)

Antes de carregar uma imagem, você precisa de um cluster Kind em execução. Se você ainda não criou um, use o seguinte comando:

```bash
kind create cluster --name my-dev-cluster
```

Você pode omitir `--name my-dev-cluster` para usar o nome de cluster padrão "kind". Este comando pode levar alguns minutos para ser concluído, pois configura o plano de controle e os nós do Kubernetes como contêineres do Docker.

## Etapa 5: Carregue a imagem do Docker no seu cluster do Kind

Com a imagem do Docker criada e o cluster do Kind em execução, agora você pode carregar a imagem nos nós do cluster. Isso torna a imagem disponível para pods em execução dentro do seu cluster do Kind sem a necessidade de baixá-la de um registro externo.

Use o comando `kind load docker-image`:

```bash
# Substitua 'my-custom-app:1.0.0' pelo nome e tag da sua imagem
# Se o seu cluster tiver um nome personalizado, especifique-o com --name
kind load docker-image my-custom-app:1.0.0 --name my-dev-cluster
```

Se você usou o nome de cluster padrão ("kind"), pode omitir o sinalizador `--name`:

```bash
kind load docker-image my-custom-app:1.0.0
```

Este comando enviará sua imagem Docker local para cada nó do seu cluster Kind.

## Etapa 6: Verificar e usar a imagem (opcional)

Após o carregamento da imagem, você pode implantar um Pod ou outra carga de trabalho no seu cluster Kind que use essa imagem. Por exemplo, você pode criar um `pod.yaml` simples:

```yaml
apiVersion: v1
kind: Pod
metadata:
name: my-test-pod
spec:
containers:
- name: my-app-container
image: my-custom-app:1.0.0 # Use a imagem que você carregou
# Importante: Defina imagePullPolicy como IfNotPresent ou Never
# para garantir que Kind use a imagem carregada localmente.
imagePullPolicy: IfNotPresent
ports:
- containerPort: 8080 # Ajuste se o seu aplicativo usa uma porta diferente
```

Em seguida, aplique:

```bash
kubectl apply -f pod.yaml
```

Verifique se o pod está em execução e usando sua imagem:

```bash
kubectl get pods
kubectl describe p
