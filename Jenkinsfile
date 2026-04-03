pipeline {
    agent { label 'linux-builder' }

    environment {
        PACKAGE_NAME = '@helatra/base'
        NEXUS_REGISTRY = 'https://artifact.helatra.com/repository/npm-hosted/'
        NVM_DIR = '/home/jenkins/.nvm'
    }

    triggers {
        GenericTrigger(
            genericVariables: [],
            token: '58ebbaf4-9018-4347-b456-db5a74cdd405',
            causeString: 'Triggered by GitHub webhook',
            printContributedVariables: false,
            printPostContent: false
        )
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'echo "Publishing ${PACKAGE_NAME}"'
            }
        }

        stage('Publish to Nexus') {
            when {
                anyOf {
                    branch 'main'
                    expression { env.GIT_BRANCH == 'origin/main' }
                    expression { env.GIT_BRANCH ==~ /.*main$/ }
                }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'nexus-npm-credentials',
                    usernameVariable: 'NEXUS_USER',
                    passwordVariable: 'NEXUS_PASS'
                )]) {
                    sh '''
                        . "$NVM_DIR/nvm.sh"
                        nvm use v20.20.0
                        NEXUS_AUTH=$(echo -n "$NEXUS_USER:$NEXUS_PASS" | base64)
                        npm config set //artifact.helatra.com/repository/npm-hosted/:_auth=$NEXUS_AUTH
                        npm publish --registry $NEXUS_REGISTRY || echo "Package version already exists, skipping"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Publish successful: ${PACKAGE_NAME}"
        }
        failure {
            echo "Publish failed: ${PACKAGE_NAME}"
        }
        cleanup {
            cleanWs()
        }
    }
}
