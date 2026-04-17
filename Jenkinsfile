pipeline {
    agent any

    stages {
	stage('Build & Deploy') {
            steps {
                sh "docker system prune -af"
                sh """sudo -u ubuntu bash -c 'cd /home/antino/axon-ev-admin-fe && bash deploy.sh'
                """
            }
        } 
        
    }
}
