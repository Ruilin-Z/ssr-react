const exec = require('child_process').exec;
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const fs = require('fs');
const inquirer = require('inquirer');
const getConfig = require('../webpack.dev.js');
inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));
const cmd = 'git rev-parse --abbrev-ref HEAD';
const options = {
	contentBase: './dist',
	hot: true,
	open: true,
	host: 'localhost',
	// proxy: {
	// 	'/api': 'https://www.npmjs.com/package/inquirer'
	// }
};
const generateTemplate = (modules) => {
	const testCode = `// import reactLoadable from './reactLoadable';
// const Detail = reactLoadable(() => import('./routers/Detail'));
`;
	const importRouters = modules.map(v => {
		return `import ${v} from './routers/${v}';
        `;
	});
	let routers = modules.map(v => {
		return `{
            path: '/${v}',
            component: ${v},
            loadData: ${v}.loadData,
            exact: true,
        },`;
	});
	routers = `const Routers = [{
        path: '/',
        component: Home,
        loadData: Home.loadData,
        exact: true,
    }, ${routers.join('\r\n')}];
    export default Routers;`;
	return testCode + importRouters.join('\r\n') + routers;
};
exec(cmd, function (error, version, stderr) {
	if (error) return false;
	const date = new Date();
	const versionStr = version.replace(/\n/, '') + `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}：${date.getMinutes()}`;

	const promptList = [{
		type: 'input',
		message: '设置一个用户名:',
		name: 'name',
		default: 'test_user' // 默认值
	}, {
		type: 'checkbox-plus',
		message: '选择颜色:',
		name: 'color',
		searchable: true,
		highlight: true,
		default: [],
		source: function (answersSoFar, input) {
			input = input || '';

			return new Promise(function (resolve) {
				const colors = ['yellow', 'red', 'green'];
				const data = colors.filter(v => !input || v.indexOf(input) > -1);

				resolve(data);
			});
		}
	}];
	inquirer.prompt(promptList).then((conf) => {
		fs.writeFile('src/cache.json', JSON.stringify(conf, '', '\t'), function (err) {
			console.log('cache写入完成');

			const config = getConfig(versionStr);
			const server = new WebpackDevServer(webpack(config), options);
			fs.readdir('src/routers', function (error, dirFiles) {
				console.log(dirFiles);
				fs.writeFile('src/Routers.js', generateTemplate(dirFiles), function () {
					console.log('写入成功');
				});
			});

			server.listen(5000, 'localhost', () => {
				console.log('dev server listening on port 5000');
			});
		});
	});
});
