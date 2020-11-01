/*eslint-disable no-restricted-globals*/

export default () => {
	self.addEventListener('message', (e) => {
		if (!e) return
		console.log('e from worker')
		console.log(e)
		let searchTerm = e.data.searchTerm
		let topics = JSON.parse(e.data.topics)

		let result = filterData(topics, searchTerm)

		let params = {
			topics: result,
			searchTerm: searchTerm
		}

		//setTimeout(() => {
		postMessage(params)
		//	}, 15000)
	})

	function filterData(array, text) {
		const getNodes = (result, object) => {
			if (object.topicName.includes(text)) {
				result.push(object)
				return result
			}
			if (Array.isArray(object.children)) {
				const nodes = object.children.reduce(getNodes, [])
				if (nodes.length) result.push({ ...object, nodes })
			}
			return result
		}

		return array.reduce(getNodes, [])
	}
}
