---
title: "Commands You Need to Know "
date: 20/01/2025
description: Aiming for perfectionism is a very good state of mind. On the other
  hand, working until perfectionism is 100% can also be bad. Here are some tips
  to help you get your portfolio off the ground.
tags:
  - Kubernetes
image: https://media-site-matheus-nuxt.s3.amazonaws.com/kubectl.jpeg
readingTime: "5"
---

# Domine o Kubernetes: Comandos Essenciais que Você Precisa Saber 🚀

**Kubernetes**, carinhosamente apelidado de **K8s**, tornou-se uma ferramenta indispensável para orquestração de contêineres. Ele automatiza a implantação, o escalonamento e o gerenciamento de aplicações em contêineres, agrupando-as em unidades lógicas para facilitar a administração e a descoberta. O Kubernetes opera com base em um modelo declarativo: você especifica o estado desejado para o seu cluster e ele trabalha para mantê-lo.

Para interagir com um cluster Kubernetes, a principal ferramenta é a interface de linha de comando `kubectl`. Dominar seus comandos é crucial para um gerenciamento eficiente. Abaixo, apresento uma seleção dos comandos `kubectl` mais úteis e usados ​​com frequência, abrangendo desde operações básicas até algumas mais avançadas.

## Compreendendo a Sintaxe Básica do `kubectl`

Antes de nos aprofundarmos nos comandos, é útil entender a estrutura geral:

```bash
kubectl [comando] [TIPO_DE_RECURSO] [NOME_DO_RECURSO] [sinalizadores]
```

- `[comando]`: A ação que você deseja executar (ex.: `get`, `describe`, `delete`).
- `[TIPO_DE_RECURSO]`: O tipo de recurso do Kubernetes (ex.: `pods`, `services`, `deployments`).
- `[NOME_DO_RECURSO]`: O nome específico do recurso (opcional para alguns comandos que listam todos os recursos de um tipo).
- `[sinalizadores]`: Opções adicionais para personalizar o comando (ex.: `-n <namespace>`, `-o wide`).

## Comandos Fundamentais do `kubectl` (Seu Dia a Dia no K8s) 🛠️

Estes são os comandos que você provavelmente usará com mais frequência:

- `kubectl get <resource>`: Lista os recursos do Kubernetes.
- *Exemplo prático*: `kubectl get pods` lista todos os Pods no namespace atual. Para ver os Pods em todos os namespaces, use `kubectl get pods --all-namespaces`.
- Adicione `-o wide` para mais informações: `kubectl get nodes -o wide`.
- `kubectl describe <resource> <resource_name>`: Exibe informações detalhadas sobre um recurso específico, muito útil para solução de problemas.
- *Exemplo prático*: `kubectl describe pod my-pod-123` mostra detalhes, eventos e status do Pod "my-pod-123".
- `kubectl create -f <filename.yaml>`: Cria um novo recurso do Kubernetes a partir de um arquivo de definição YAML ou JSON.
- *Dica*: Esta é a maneira preferencial de criar recursos declarativamente.
- `kubectl apply -f <filename.yaml>`: Aplica uma configuração a um recurso do Kubernetes. Se o recurso não existir, ele será criado. Se já existir, será atualizado. Geralmente, isso é preferível a `create` para gerenciamento contínuo.
- *Exemplo prático*: `kubectl apply -f my-deployment.yaml`.
- `kubectl delete <resource> <resource_name>` ou `kubectl delete -f <filename.yaml>`: Remove um recurso do Kubernetes.
- *Exemplo prático*: `kubectl delete deployment my-app-deployment`.
- `kubectl scale deployment <nome_da_implantação> --replicas=<número>`: Define o número de réplicas para uma implantação.
- *Exemplo prático*: `kubectl scale deployment my-app --replicas=3`.
- `kubectl logs <nome_do_pod>`: Exibe os logs de um contêiner dentro de um Pod.
- *Dica*: Use `-f` para acompanhar os logs em tempo real (`kubectl logs -f my-pod-123`). Se o Pod tiver vários contêineres, especifique o contêiner com `-c <nome_do_contêiner>`.
- `kubectl exec -it <nome_do_pod> -- <comando>`: Executa um comando interativo dentro de um contêiner de um Pod.
- *Exemplo prático*: `kubectl exec -it my-pod-123 -- /bin/bash` abre um shell bash dentro do contêiner.
- `kubectl port-forward <nome_do_pod> <porta_local>:<porta_do_pod>`: Encaminha uma ou mais portas locais para um Pod. Útil para acessar um aplicativo em execução no Pod localmente durante o desenvolvimento.
- *Exemplo prático*: `kubectl port-forward my-web-pod 8080:80`.

## Comandos Avançados e de Gerenciamento ⚙️

Para tarefas mais específicas e gerenciamento de cluster:

- `kubectl rollout status deployment/<nome_da_implantação>`: Rastreia o status de uma implementação.
- `kubectl rollout history deployment/<nome_da_implantação>`: Mostra o histórico de revisões de uma implementação.
- `kubectl rollout undo deployment/<nome_da_implantação> --to-revision=<número>`: Reverte uma implementação para uma revisão anterior.
- `kubectl cluster-info`: Exibe informações sobre o cluster Kubernetes (endereço mestre, DNS do cluster).
- `kubectl config view`: Exibe a configuração atual do `kubectl`.
- `kubectl config use-context <nome_do_contexto>`: Alterna o contexto atual do `kubectl` (útil se você gerencia vários clusters).
- `kubectl drain <nome_do_nó>`: Esvazia um nó, preparando-o para manutenção (impede que novos Pods sejam agendados e remove os existentes sem problemas).
- `kubectl cordon <nome_do_nó>`: Marca um nó como não agendável, impedindo que novos Pods sejam alocados a ele.
- `kubectl uncordon <nome_do_nó>`: Permite que Pods sejam agendados novamente em um nó previamente isolado.
- `kubectl top node`: Exibe o consumo de CPU e memória dos nós.
- `kubectl top pod`: Exibe o consumo de CPU e memória dos Pods.

## Outros Comandos Úteis que Facilitam a Vida ✨

- `kubectl explain <resource>`: Fornece documentação detalhada sobre os campos de um recurso do Kubernetes. Muito útil para aprender o
