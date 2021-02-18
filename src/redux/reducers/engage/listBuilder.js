import {
	SET_CHANNELS,
	SET_VIDEOS,
	REMOVE_ALL_VIDEOS,
	REMOVE_ALL_CHANNELS,
	REMOVE_ALL_CHANNEL_VIDEOS,
	SET_CHANNELS_HAS_NEXT_PAGE,
	SET_CHANNEL_VIDEOS_HAS_NEXT_PAGE,
	SET_VIDEOS_HAS_NEXT_PAGE,
	SET_VIDEOS_IS_LOADING,
	SET_CHANNELS_IS_LOADING,
	SET_VISIBLE_CHANNEL_COLUMNS,
	SET_VISIBLE_VIDEO_COLUMNS,
	SET_CHANNEL_VIDEOS
} from '../../action-types/engage/listBuilder'
import {
	channelColumns,
	videoColumns
} from '../../../views/Engage/Lists/constants'

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

export function channelVideos(state = [], action) {
	switch (action.type) {
		case SET_CHANNEL_VIDEOS:
			let currentVideos = [...state].concat(action.channelVideos)
			return currentVideos
		case REMOVE_ALL_CHANNEL_VIDEOS:
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

export function channelsHasNextPage(state = true, action) {
	switch (action.type) {
		case SET_CHANNELS_HAS_NEXT_PAGE:
			return action.channelsHasNextPage
		default:
			return state
	}
}

export function channelVideosHasNextPage(state = true, action) {
	switch (action.type) {
		case SET_CHANNEL_VIDEOS_HAS_NEXT_PAGE:
			return action.channelVideosHasNextPage
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

export function videosIsLoading(state = true, action) {
	switch (action.type) {
		case SET_VIDEOS_IS_LOADING:
			return action.videosIsLoading
		default:
			return state
	}
}

export function channelsIsLoading(state = true, action) {
	switch (action.type) {
		case SET_CHANNELS_IS_LOADING:
			return action.channelsIsLoading
		default:
			return state
	}
}

export function visibleChannelColumns(state = channelColumns, action) {
	switch (action.type) {
		case SET_VISIBLE_CHANNEL_COLUMNS:
			return action.visibleChannelColumns
		default:
			return state
	}
}

export function visibleVideoColumns(state = videoColumns, action) {
	switch (action.type) {
		case SET_VISIBLE_VIDEO_COLUMNS:
			return action.visibleVideoColumns
		default:
			return state
	}
}
