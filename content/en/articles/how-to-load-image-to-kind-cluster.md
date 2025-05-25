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

# Easily Load Docker Images into Your Kind Kubernetes Cluster 🐳⚙️

Kind (Kubernetes in Docker) is a fantastic tool for running local Kubernetes clusters using Docker container "nodes." It's incredibly useful for testing your containerized applications and Kubernetes configurations before deploying them to a production environment. One common task is getting your custom Docker images into this local Kind cluster.

Today, I'll walk you through the process step-by-step, from installing Kind and `kubectl` to building a Docker image and loading it into your Kind cluster.

## Prerequisites

Before we begin, make sure you have the following installed on your Linux system:

1.  **Docker**: Kind uses Docker to run the Kubernetes nodes. If you don't have it, please install it first. You can find instructions on the [official Docker website](https://docs.docker.com/engine/install/).
2.  **Curl** (usually pre-installed on most Linux distributions).

## Step 1: Install Kind

First, let's install Kind. These commands download the appropriate binary for your system architecture and move it to your local binaries directory.

```bash
# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind [https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64](https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64)
# For ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind [https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-arm64](https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-arm64)

chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

_Note: `v0.23.0` is used here as an example. You can check the [Kind releases page](https://github.com/kubernetes-sigs/kind/releases) for the latest version and update the URL accordingly._

Verify the installation:

```bash
kind version
```

## Step 2: Install `kubectl`

`kubectl` is the command-line tool for interacting with Kubernetes clusters, including your Kind cluster.

1.  **Download the latest stable release of `kubectl`:**
    ```bash
    curl -LO "[https://dl.k8s.io/release/$(curl](https://dl.k8s.io/release/$(curl) -L -s [https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl](https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl)"
    ```
2.  **Make the `kubectl` binary executable:**
    ```bash
    chmod +x ./kubectl
    ```
3.  **Move the binary into your PATH:**
    ```bash
    sudo mv ./kubectl /usr/local/bin/kubectl
    ```
4.  **Verify the installation:**
    ```bash
    kubectl version --client
    ```

## Step 3: Build Your Docker Image

Now, you need a Docker image to load into your Kind cluster. If you have a `Dockerfile` for your application, navigate to the directory containing your `Dockerfile` and run:

```bash
# Replace 'my-custom-app:1.0.0' with your desired image name and tag
docker build -t my-custom-app:1.0.0 .
```

This command builds a Docker image using the `Dockerfile` in the current directory (`.`) and tags it as `my-custom-app:1.0.0`. Make sure this image is available locally on your machine where Docker is running.

## Step 4: Create a Kind Cluster (If You Don't Have One)

Before you can load an image, you need a running Kind cluster. If you haven't created one yet, use the following command:

```bash
kind create cluster --name my-dev-cluster
```

You can omit `--name my-dev-cluster` to use the default cluster name "kind". This command might take a few minutes to complete as it sets up the Kubernetes control plane and node(s) as Docker containers.

## Step 5: Load the Docker Image into Your Kind Cluster

With your Docker image built and your Kind cluster running, you can now load the image into the cluster's nodes. This makes the image available for pods running inside your Kind cluster without needing to pull it from an external registry.

Use the `kind load docker-image` command:

```bash
# Replace 'my-custom-app:1.0.0' with the actual name and tag of your image
# If your cluster has a custom name, specify it with --name
kind load docker-image my-custom-app:1.0.0 --name my-dev-cluster
```

If you used the default cluster name ("kind"), you can omit the `--name` flag:

```bash
kind load docker-image my-custom-app:1.0.0
```

This command will push your local Docker image into each node of your Kind cluster.

## Step 6: Verify and Use the Image (Optional)

Once the image is loaded, you can deploy a Pod or other workload to your Kind cluster that uses this image. For example, you could create a simple `pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-test-pod
spec:
  containers:
  - name: my-app-container
    image: my-custom-app:1.0.0 # Use the image you loaded
    # Important: Set imagePullPolicy to IfNotPresent or Never
    # to ensure Kind uses the locally loaded image.
    imagePullPolicy: IfNotPresent
    ports:
    - containerPort: 8080 # Adjust if your app uses a different port
```

Then apply it:

```bash
kubectl apply -f pod.yaml
```

Check if the pod is running and using your image:

```bash
kubectl get pods
kubectl describe pod my-test-pod
```

Setting `imagePullPolicy: IfNotPresent` (or `Never`) is crucial here. If it's set to `Always` (or omitted, where it might default to `Always` depending on the image tag `:latest`), Kubernetes will try to pull the image from an external registry, which might not be what you want for a locally loaded image.

## Conclusion

Loading local Docker images into your Kind cluster is a straightforward process that greatly simplifies local Kubernetes development and testing. By following these steps, you can quickly iterate on your applications within a realistic Kubernetes environment running right on your machine.

This capability makes Kind an invaluable tool for any developer working with Kubernetes. Happy Kinding!

---
