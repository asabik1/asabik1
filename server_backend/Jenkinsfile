def directory = "/home/deploy/asabik_dev/asabik-backend"

pipeline {
    agent { 
        label "asabik"
    }
    stages {
        stage('pull development branch') {
            steps {
                dir("${directory}") {
                    sh "git clean -ffdx"
                    git url: 'git@github.com:Marotino-INC/asabik-backend.git', branch: 'development'
                    sh "git log --oneline -n 5"
                }
            }
        }
        stage('copy env files') {
            steps {
                dir("${directory}") {
                    sh "cp ../env/backend/.env ."
                    sh "cp ../env/backend/database.config.ts ."
                }
            }
        }
        stage('install and build') {
            steps {
                dir("${directory}") {
                    sh "npm install"
                    sh "npm run typeorm:run"
                    sh "npm run build"
                }
            }
        }
        stage('deploy') {
            steps {
                dir("${directory}") {
                    sh "pm2 del asabik-backend-dev"
                    sh "pm2 start \"npm run start:prod\" --name \"asabik-backend-dev\""
                }
            }
        }
    }
}
