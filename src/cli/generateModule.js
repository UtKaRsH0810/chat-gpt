const chalk = require('chalk');
const shell = require('shelljs');

module.exports=async (moduleName,apiVersion)=>{
    const prefix=`${shell.pwd()}/src`;
    await shell.mkdir('-p',`${prefix}/${apiVersion}/components/${moduleName}`)
    await shell.cp(`${prefix}/cli/moduleStructure/moduleStructure.service.js`, `${prefix}/${apiVersion}/components/${moduleName}/${moduleName}.service.js`);
    await shell.cp(`${prefix}/cli/moduleStructure/moduleStructure.routes.js`, `${prefix}/${apiVersion}/components/${moduleName}/${moduleName}.routes.js`);
    await shell.cp(`${prefix}/cli/moduleStructure/moduleStructure.controller.js`, `${prefix}/${apiVersion}/components/${moduleName}/${moduleName}.controller.js`);
    await shell.cp(`${prefix}/cli/moduleStructure/moduleStructure.module.js`, `${prefix}/${apiVersion}/components/${moduleName}/${moduleName}.module.js`);
    await shell.cp(`${prefix}/cli/moduleStructure/moduleStructure.validator.js`, `${prefix}/${apiVersion}/components/${moduleName}/${moduleName}.validator.js`);
    await shell.sed('-i', 'sampleComponent', `${moduleName}`, `${prefix}/${apiVersion}/components/${moduleName}/${moduleName}.module.js`);

    /*
    const sourceImport="//dummy_import:dont_touch_it:part_of_cli"
    const importReplaceWith=`const ${moduleName}Module = require('../../v1/components/${moduleName}/${moduleName}.module');`
    const source="//dummy:dont_touch_it:part_of_cli"
    const replaceWith=`router.use('/${api_url}', ${moduleName}Module.${moduleName}Routes);`
    await shell.sed('-e', sourceImport, importReplaceWith, `${prefix}/loaders/${apiVersion}/routes.js`);
    await shell.sed('-e', source, replaceWith, `${prefix}/loaders/${apiVersion}/routes.js`);
    */
}