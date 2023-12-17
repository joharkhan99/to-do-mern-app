pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'todo'
    }

    stages {
        stage('Print Current Directory') {
            steps {
                script {
                    sh 'pwd'
                }
            }
        }

        stage('Build and Push Frontend Docker Image') {
            steps {
                script {
                    dir('client') {
                        sh 'pwd' // Print current directory for debugging
                        sh 'sudo docker build -t ${DOCKER_IMAGE}frontend .'
                    }
                }
            }
        }

        stage('Build and Push Backend Docker Image') {
            steps {
                script {
                    dir('server') {
                        sh 'pwd' // Print current directory for debugging
                        sh 'sudo docker build -t ${DOCKER_IMAGE}backend .'
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
}
