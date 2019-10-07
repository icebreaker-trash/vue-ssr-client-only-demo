const Vue = require('vue')
const server = require('express')()
const {
	createRenderer
} = require('vue-server-renderer')
const ClientOnly = require('./components/ClientOnly')
const renderer = createRenderer({
	//template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

const context = {
	title: 'hello',
	meta: `
    <meta charset="utf-8">
  `
}

server.get('*', async (req, res) => {
	const app = new Vue({
		data: {
			url: req.url
		},
		template: `<div>访问的 URL 是： {{ url }}<client-only><h3>这是客户端渲染</h3></client-only></div>`,
		components: {
			ClientOnly
		}

	})
	try {
		const html = await renderer.renderToString(app, context)
		res.end(html)
	} catch (error) {
		console.log(error)
	}
})

server.listen(8080)