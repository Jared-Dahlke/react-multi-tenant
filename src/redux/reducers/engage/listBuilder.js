import {
	SET_CHANNELS,
	SET_VIDEOS,
	REMOVE_ALL_VIDEOS,
	REMOVE_ALL_CHANNELS,
	SET_HAS_NEXT_PAGE,
	SET_VIDEOS_HAS_NEXT_PAGE
} from '../../action-types/engage/listBuilder'

export function videos(state = [], action) {
	switch (action.type) {
		case SET_VIDEOS:
			let currentVideos = [...state].concat(action.videos)
			return currentVideos
		case REMOVE_ALL_VIDEOS:
			return []
		default:
			return state
	}
}

export function channels(state = [], action) {
	switch (action.type) {
		case SET_CHANNELS:
			let currentChannels = [...state].concat(action.channels)
			return currentChannels
		case REMOVE_ALL_CHANNELS:
			return []
		default:
			return state
	}
}

export function hasNextPage(state = true, action) {
	switch (action.type) {
		case SET_HAS_NEXT_PAGE:
			return action.hasNextPage
		default:
			return state
	}
}

export function videosHasNextPage(state = true, action) {
	switch (action.type) {
		case SET_VIDEOS_HAS_NEXT_PAGE:
			return action.videosHasNextPage
		default:
			return state
	}
}
