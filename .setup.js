const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.join(__dirname, 'apps', 'meetings-app', '.env'))) {
  fs.copyFileSync(
    path.join(__dirname, 'apps', 'meetings-app', '.env.example'),
    path.join(__dirname, 'apps', 'meetings-app', '.env')
  );
}

if (!fs.existsSync(path.join(__dirname, 'apps', 'user-app', '.env'))) {
  fs.copyFileSync(
    path.join(__dirname, 'apps', 'user-app', '.env.example'),
    path.join(__dirname, 'apps', 'user-app', '.env')
  );
}

process.exit(0);
