#!groovy
@Library('jk-pipeline-library') _

def imgHubQA = "hub.digi-sky.com"
def imgNamespace = 'yw'
def artifactId = 'autonline-meta'

def deploymentname = "autonline-meta"
def namespace = "autonline-system"

def getGitShortCommitId() {
    sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
}

node("autonline"){
    stage("Checkout Code"){
        checkout scm
    }
    stage("Set PIPELINE VERSION"){
        env.PIPELINE_VERSION = "git${getGitShortCommitId()}.${env.BUILD_NUMBER}"
        echo "Set Pipeline Version: ${env.PIPELINE_VERSION}"
    }
    stage("Build Image"){
        container("dind"){
            docker.withRegistry("https://${imgHubQA}", "imgbuild-harbor") {
                imageName = "${imgNamespace}/${artifactId}:${env.PIPELINE_VERSION}"
                harborImage = docker.build(imageName, ".")
                harborImage.push()
            }
        }
    }
    stage("Deploy Autonline-Meta"){
        container("jnlp"){
            withKubeConfig(caCertificate: '', credentialsId: "ops-business-cluster", serverUrl: '') {
                jkabsTask('task.id': 'kubectl_set',
                        'registry.url': "${imgHubQA}",
                        'image.name': "${imgNamespace}/${artifactId}",
                        'build.pipeline.version': "${env.PIPELINE_VERSION}",
                        'k8s.deploymentname': "${deploymentname}",
                        'k8s.deployment.namespace': "${namespace}")
            }
        }
    }
}
