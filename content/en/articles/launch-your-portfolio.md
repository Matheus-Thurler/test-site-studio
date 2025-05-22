---
title: Finally launch your portfolio
date: 20/10/2023
description: Aiming for perfectionism is a very good state of mind. On the other
  hand, working until perfectionism is 100% can also be bad. Here are some tips
  to help you get your portfolio off the ground.
tags:
  - Portfolio
  - Development
  - Design
  - Productivity
image: https://media-site-matheus-nuxt.s3.amazonaws.com/kubectl.jpeg
readingTime: "5"
---

# Master Kubernetes: Essential Commands You Need to Know 🚀

**Kubernetes**, affectionately nicknamed **K8s**, has become an indispensable tool for container orchestration. It automates the deployment, scaling, and management of containerized applications, grouping them into logical units for easy administration and discovery. Kubernetes operates based on a declarative model: you specify the desired state for your cluster, and it works to maintain it.

To interact with a Kubernetes cluster, the primary tool is the `kubectl` command-line interface. Mastering its commands is crucial for efficient management. Below, I present a selection of the most useful and frequently used `kubectl` commands, ranging from basic operations to some more advanced ones.

## Understanding Basic `kubectl` Syntax

Before diving into the commands, it's helpful to understand the general structure:

```bash
kubectl [command] [RESOURCE_TYPE] [RESOURCE_NAME] [flags]
```

- `[command]`: The action you want to perform (e.g., `get`, `describe`, `delete`).
- `[RESOURCE_TYPE]`: The type of Kubernetes resource (e.g., `pods`, `services`, `deployments`).
- `[RESOURCE_NAME]`: The specific name of the resource (optional for some commands that list all resources of a type).
- `[flags]`: Additional options to customize the command (e.g., `-n <namespace>`, `-o wide`).

## Fundamental `kubectl` Commands (Your Day-to-Day in K8s) 🛠️

These are the commands you'll likely use most frequently:

- `kubectl get <resource>`: Lists Kubernetes resources.
  - _Practical example_: `kubectl get pods` lists all Pods in the current namespace. To see Pods in all namespaces, use `kubectl get pods --all-namespaces`.
  - Add `-o wide` for more information: `kubectl get nodes -o wide`.
- `kubectl describe <resource> <resource_name>`: Displays detailed information about a specific resource, very useful for troubleshooting.
  - _Practical example_: `kubectl describe pod my-pod-123` shows details, events, and status of the Pod "my-pod-123".
- `kubectl create -f <filename.yaml>`: Creates a new Kubernetes resource from a YAML or JSON definition file.
  - _Tip_: This is the preferred way to create resources declaratively.
- `kubectl apply -f <filename.yaml>`: Applies a configuration to a Kubernetes resource. If the resource doesn't exist, it will be created. If it already exists, it will be updated. This is generally preferable to `create` for ongoing management.
  - _Practical example_: `kubectl apply -f my-deployment.yaml`.
- `kubectl delete <resource> <resource_name>` or `kubectl delete -f <filename.yaml>`: Removes a Kubernetes resource.
  - _Practical example_: `kubectl delete deployment my-app-deployment`.
- `kubectl scale deployment <deployment_name> --replicas=<number>`: Sets the number of replicas for a Deployment.
  - _Practical example_: `kubectl scale deployment my-app --replicas=3`.
- `kubectl logs <pod_name>`: Displays the logs of a container within a Pod.
  - _Tip_: Use `-f` to follow logs in real-time (`kubectl logs -f my-pod-123`). If the Pod has multiple containers, specify the container with `-c <container_name>`.
- `kubectl exec -it <pod_name> -- <command>`: Executes an interactive command inside a container of a Pod.
  - _Practical example_: `kubectl exec -it my-pod-123 -- /bin/bash` opens a bash shell inside the container.
- `kubectl port-forward <pod_name> <local_port>:<pod_port>`: Forwards one or more local ports to a Pod. Useful for accessing an application running in the Pod locally during development.
  - _Practical example_: `kubectl port-forward my-web-pod 8080:80`.

## Advanced and Management Commands ⚙️

For more specific tasks and cluster management:

- `kubectl rollout status deployment/<deployment_name>`: Tracks the status of a deployment rollout.
- `kubectl rollout history deployment/<deployment_name>`: Shows the revision history of a deployment.
- `kubectl rollout undo deployment/<deployment_name> --to-revision=<number>`: Reverts a deployment to a previous revision.
- `kubectl cluster-info`: Displays information about the Kubernetes cluster (master address, cluster DNS).
- `kubectl config view`: Displays the current `kubectl` configuration.
- `kubectl config use-context <context_name>`: Switches the current `kubectl` context (useful if you manage multiple clusters).
- `kubectl drain <node_name>`: Drains a node, preparing it for maintenance (prevents new Pods from being scheduled and removes existing ones gracefully).
- `kubectl cordon <node_name>`: Marks a node as unschedulable, preventing new Pods from being allocated to it.
- `kubectl uncordon <node_name>`: Allows Pods to be scheduled again on a previously cordoned node.
- `kubectl top node`: Displays CPU and memory consumption of nodes.
- `kubectl top pod`: Displays CPU and memory consumption of Pods.

## Other Useful Commands That Make Life Easier ✨

- `kubectl explain <resource>`: Provides detailed documentation about the fields of a Kubernetes resource. Very useful for learning the structure of YAML files.
  - _Practical example_: `kubectl explain pod.spec.containers`.
- `kubectl edit <resource> <resource_name>`: Opens the default editor to modify a resource's configuration directly on the cluster.
  - _Caution_: Use sparingly; always prefer `apply -f` to maintain version control of your configurations.
- `kubectl diff -f <filename.yaml>`: Compares a local manifest with the current configuration in the cluster, showing differences before applying.

## Shortcuts (Aliases) for Agility ⚡

Many `kubectl` commands have shortcuts to save time. For example:

- `po` for `pods`
- `svc` for `services`
- `deploy` for `deployments`
- `ns` for `namespaces`

So, `kubectl get pods` can be written as `kubectl get po`.

## Common Global Options (Flags) 🚩

Most `kubectl` commands accept additional options (flags):

- `-n <namespace>` or `--namespace=<namespace>`: Specifies the namespace for the operation.
- `-A` or `--all-namespaces`: Operates on all namespaces (for commands like `get`).
- `-o <format>`: Defines the output format (e.g., `-o yaml`, `-o json`, `-o wide`).

## Need Help? 🤔

To get more information about a specific command, use `kubectl help <command>`:

- _Example_: `kubectl help get` or `kubectl get --help`.

## Conclusion: Keep Exploring!

This list covers a good portion of the `kubectl` commands you'll use in your day-to-day work with Kubernetes. However, K8s is a vast ecosystem, and there's always more to learn. Constant practice and exploring the official documentation are your best allies.
