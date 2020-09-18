const NodeSSH = require("node-ssh");
const ssh = new NodeSSH();

module.exports = async () => {
  try {
    await ssh.connect({
      host: "YOUR_HOST",
      username: "YOUR_USERNAME",
      privateKey: "YOUR_PRIVATE_KEY_PATH_TO_CONNECT",
    });
    const { stderr, stdout } = await ssh.execCommand(`
            echo "[INFO] Deployment started"
            REPO_URL="YOUR_REPO_URL"
            cd ~/apps
            cd test
            if [ $? -eq 0 ]
            then
              echo "[INFO] Repo exist"
              cd .git
              if [ $? -eq 0 ]
              then
                echo "[INFO] Git exist"
                cd ..
                git pull
              else
                echo "[INFO] Git does not exist, folder deleting and cloning from origin.."
                cd ..
                rm -rf test
                git clone $REPO_URL
                cd test
              fi
            else
              echo "[INFO] Repo does not exist, cloning.."
              git clone $REPO_URL
              cd test
            fi
            echo "[INFO] Dependencies installing"
            npm install
            pm2 stop test
            pm2 start ./bin/www --name test
            pm2 reload test
            echo "[INFO] Deployment successful, app running."
        `);
    console.log({ stdout, stderr });
    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
};
