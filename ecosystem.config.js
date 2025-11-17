module.exports = {
    apps: [
        {
            name: 'app1',
            script: 'npm',
            args: 'start',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};


// module.exports = {
//     apps: [
//         {
//             name: 'app1',
//             script: 'npm run start',
//             cwd: '/u01/www/public_html/uat.sedarglobal.com/app1',
//             env: {
//                 NODE_ENV: 'development'
//             },
//             env_production: {
//                 NODE_ENV: 'production'
//             }
//         }
//     ],
//     deploy: {
//         development: {
//             user: 'opc',
//             host: '10.100.1.7',
//            // key: '/home/opc/.ssh/authorized_keys',
//             ssh_options: 'ForwardAgent=yes',
//             ref: 'origin/dev',
//             repo: 'git@github.com:sedarglobal/sedarglobal-nextjs-ssr.git',
//             path: '/u01/www/public_html/uat.sedarglobal.com/app1',
//             'post-deploy': 'sh nextjs-pm2-deploy.sh'
//         },
//         production: {
//             user: 'opc',
//             host: '10.100.1.7',
//            // key: '/home/opc/.ssh/authorized_keys',
//             ssh_options: 'ForwardAgent=yes',
//             ref: 'origin/dev',
//             repo: 'git@github.com:sedarglobal/sedarglobal-nextjs-ssr.git',
//             path: '/u01/www/public_html/uat.sedarglobal.com/',
//             'post-deploy': 'sh nextjs-pm2-deploy.sh'
//         }
//     }
// };