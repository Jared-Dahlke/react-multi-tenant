import {
	SET_CATEGORIES,
	SET_CHANNELS,
	SET_VIDEOS
} from '../../action-types/discover/channels'

export function categories(state = [], action) {
	switch (action.type) {
		case SET_CATEGORIES:
			return action.categories
		default:
			return state
	}
}

function filterCountries(filters, items) {
	let newItems = []
	let copiedItems = JSON.parse(JSON.stringify(items))
	for (const item of copiedItems) {
		if (item.country === filters.country) {
			newItems.push(item)
		}
	}
	return newItems
}

export function channels(state = [], action) {
	switch (action.type) {
		case SET_CHANNELS:
			//TODO: the getchannels api should accept categories as an input, for now i will filter by categories here
			//filter out filters action.filters
			let filters = action.payload.filters
			let channels = action.payload.channels
			if (filters.country) {
				channels = filterCountries(filters, action.payload.channels)
			}

			return channels
		default:
			return state
	}
}

export function videos(state = [], action) {
	switch (action.type) {
		case SET_VIDEOS:
			//TODO: the getchannels api should accept categories as an input, for now i will filter by categories here
			//filter out filters
			let currentVideos = [...state].concat(action.videos)
			return currentVideos //action.videos
		default:
			return state
	}
}
