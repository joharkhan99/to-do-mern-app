pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'todo'
    }

    stages {
        stage('Build and Push Frontend Docker Image') {
            steps {
                script {
                    dir('client') {
                        sh 'docker build -t ${DOCKER_IMAGE}frontend ./client'
                        sh 'docker push ${DOCKER_IMAGE}frontend'
                    }
                }
            }
        }

        stage('Build and Push Backend Docker Image') {
            steps {
                script {
                    dir('server') {
                        sh 'docker build -t ${DOCKER_IMAGE}backend .server'
                        sh 'docker push ${DOCKER_IMAGE}backend'
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
