//GET /discover/categories
//GET /discover/channels
//GET/discover/videos
import axios from '../../../axiosConfig'
import config from '../../../config.js'
import {
	SET_CATEGORIES,
	SET_CHANNELS,
	SET_VIDEOS
} from '../../action-types/discover/channels'

const apiBase = config.api.userAccountUrl

export function fetchCategories() {
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

function getChannelToggleValue(channelId, channels) {
	for (const channel of channels) {
		if (channel.channelId === channelId) {
			return channel.toggleValue
		}
	}
}

export function fetchVideos(channels, categories) {
	let url = apiBase + `/discover/videos` //TODO: eventually the api should filter by channel id, but i will do it here for the demo
	return async (dispatch) => {
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				let channelIdsArray = []
				for (const channel of channels) {
					if (
						!channelIdsArray.includes(channel.channelId) &&
						channel.toggleValue
					) {
						channelIdsArray.push(channel.channelId)
					}
				}

				let categoryIdsArray = []
				for (const category of categories) {
					if (
						!categoryIdsArray.includes(category.categoryId) &&
						category.toggleValue
					) {
						categoryIdsArray.push(category.categoryId)
					}
				}

				let filteredVideos = []
				let myCount = 0
				for (const video of result.data) {
					if (
						channelIdsArray.includes(video.channelId) &&
						categoryIdsArray.includes(video.categoryId)
					) {
						video.toggleValue = getChannelToggleValue(video.channelId, channels)
						filteredVideos.push(video)
						myCount = myCount + 1
					}
				}

				dispatch(setVideos(filteredVideos))
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
