//GET /discover/categories
//GET /discover/channels
//GET/discover/videos
import axios from '../../../axiosConfig'
import defaultAxios from 'axios'
import config from '../../../config.js'
import {
	SET_CATEGORIES,
	SET_CHANNELS,
	SET_VIDEOS
} from '../../action-types/discover/channels'

const apiBase = config.api.listBuilderUrl

/*export function fetchCategories() {
	let url = apiBase + `/discover/categories`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				//let brandProfiles = result.data
				dispatch(setCategories(result.data))
				//dispatch(brandProfilesIsLoading(false))
			}
			// dispatch(categoriesIsLoading(false))
		} catch (error) {
			alert(error)
			console.log(error)
		}
	}
}

export function setCategories(categories) {
	return {
		type: SET_CATEGORIES,
		categories
	}
}

function getToggleValue(categoryId, categories) {
	for (const category of categories) {
		if (category.categoryId === categoryId) {
			return category.toggleValue
		}
	}
}

export function fetchChannels(categories, filters) {
	let url = apiBase + `/discover/channels` //TODO: eventually the api should filter by category id, but i will do it here for the demo
	return async (dispatch) => {
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				let categoryIdsArray = []
				for (const category of categories) {
					if (
						!categoryIdsArray.includes(category.categoryId) &&
						category.toggleValue
					) {
						categoryIdsArray.push(category.categoryId)
					}
				}

				let filteredChannels = []
				let myCount = 0
				for (const channel of result.data) {
					if (categoryIdsArray.includes(channel.categoryId)) {
						channel.toggleValue = getToggleValue(channel.categoryId, categories)
						filteredChannels.push(channel)
						myCount = myCount + 1
					}
				}

				let payload = { channels: filteredChannels, filters: filters }
				dispatch(setChannels(payload))
				dispatch(fetchVideos(filteredChannels, categories))
			}
		} catch (error) {
			alert(error)
			console.log(error)
		}
	}
}

export function setChannels(payload) {
	return {
		type: SET_CHANNELS,
		payload
	}
}
*/

export function fetchVideos(query, pageNumber) {
	let url = apiBase + `/smart-list/video?size=100&page=${pageNumber}`
	return async (dispatch) => {
		try {
			const result = await defaultAxios({
				method: 'POST',
				url: url
				//params: { q: 'zebras', page: pageNumber }
			})
			//	const result = await defaultAxios.get(url, {)

			if (result.status === 200) {
				dispatch(setVideos(result.data))
			}
		} catch (error) {
			alert(error)
			console.log(error)
		}
	}
}

export function setVideos(videos) {
	return {
		type: SET_VIDEOS,
		videos
	}
}

export function fetchChannels(query, pageNumber) {
	let url = apiBase + `/smart-list/channel?size=100&page=${pageNumber}`
	return async (dispatch) => {
		try {
			const result = await defaultAxios({
				method: 'POST',
				url: url
				//params: { q: 'zebras', page: pageNumber }
			})
			//	const result = await defaultAxios.get(url, {)

			if (result.status === 200) {
				dispatch(setChannels(result.data))
			}
		} catch (error) {
			alert(error)
			console.log(error)
		}
	}
}

export function setChannels(channels) {
	return {
		type: SET_CHANNELS,
		channels
	}
}
