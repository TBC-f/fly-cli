
const path = require('path');
const program = require('commander');
const { version } = require('./constants');

//console.log(process.argv);// 解析用户传递过来的参数
const mapActions = {
    create: {
      alias: 'c',
      description: 'create a project',
      examples: [
        'fly-cli create <project-name>',
      ],
    },
    config: {
      alias: 'conf',
      description: 'config project variable',
      examples: [
        'fly-cli config set <k> <v>',
        'fly-cli config get <k>',
      ],
    },
    '*': {
      alias: '',
      description: 'command not found',
      examples : [],
    },
};
Reflect.ownKeys(mapActions).forEach((action) =>{
    program
        .command(action)
        .alias(mapActions[action]['alias'])
        .description(mapActions[action]['description'])
        .action(() =>{
            if (action === '*') {
                console.log(mapActions[action].description);
            } else {
                //console.log(action);
                require(path.resolve(__dirname, action))(...process.argv.slice(3));
            }
        });

});

// 监听用户的help 事件
program.on('--help', () => {
    console.log('\nExamples:');
    Reflect.ownKeys(mapActions).forEach((action) => {
      mapActions[action].examples.forEach((example) => {
        console.log(`  ${example}`);
      });
    });
});


program 
    .version(version)
    .parse(process.argv);
