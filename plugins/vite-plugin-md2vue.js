// /plugins/vite-plugin-md2vue.js

import { marked } from 'marked'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

function initMdObj(dir) {
	const
		mdObj = {},
		files = fs.readdirSync(dir, { withFileTypes: true })

	files.forEach(file => {
		if (!file.isDirectory() && file.name.endsWith('.md')) {
			const mdData = matter(fs.readFileSync(path.resolve(dir, file.name), 'utf-8'))
			mdObj[file.name.slice(0, -3)] = {
				...mdData.data,
				md: marked(mdData.content)
			}
		}
	})
	return mdObj
}
export default function (dir) {
	const
		mdModuleId = 'mdDir',
		resolvedMdModuleId = '\0' + mdModuleId
	return {
		name: 'vitePluginMd2Vue',
		enforce: 'pre',
		handleHotUpdate(ctx) {
			const { file, server, modules } = ctx;
			if (file.endsWith('.md') && file.startsWith(path.resolve(dir))) {
				const relationModule = [...server.moduleGraph.getModulesByFile(resolvedMdModuleId)][0];
				return [...modules, relationModule]
			}
		},
		resolveId(id) {
			if (id === mdModuleId) {
				return resolvedMdModuleId
			}
		},
		load(id) {
			if (id === resolvedMdModuleId) {
				const
					mdObj = initMdObj(dir),
					reg = /src="(\/src\/assets\/md\/.*?)"/g
				return {
					code: `
					const mdObj = ${JSON.stringify(mdObj)}
					for(const name in mdObj){
						mdObj[name].banner = import.meta.globEager("/src/assets/*")[mdObj[name].banner]?.default
						mdObj[name].logo = import.meta.globEager("/src/assets/*")[mdObj[name].logo]?.default
						mdObj[name].md = mdObj[name].md.replace(${reg}, (_, c) => \`src="\${import.meta.globEager("/src/assets/md/*")[c]?.default}"\`)
					}
					export default mdObj;
					`,
					map: null
				}
			}
		},
	}
}
