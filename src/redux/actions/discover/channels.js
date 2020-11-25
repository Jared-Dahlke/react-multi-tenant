import axios from '../../../axiosConfig'
import defaultAxios from 'axios'
import config from '../../../config.js'
import {
	SET_CHANNELS,
	SET_VIDEOS,
	REMOVE_ALL_VIDEOS,
	REMOVE_ALL_CHANNELS,
	SET_HAS_NEXT_PAGE
} from '../../action-types/discover/channels'

const apiBase = config.api.listBuilderUrl

export function fetchVideos(args) {
	let url =
		apiBase +
		`/smart-list/video?size=100&page=${args.pageNumber}&versionId=${args.versionId}`
	return async (dispatch) => {
		try {
			const result = await defaultAxios({
				method: 'POST',
				url: url,
				data: args.filters
			})
			//	const result = await defaultAxios.get(url, {)

			if (result.status === 200) {
				if (result.data.length < 100) {
					dispatch(setHasNextPage(false))
				}
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

export function setHasNextPage(hasNextPage) {
	return {
		type: SET_HAS_NEXT_PAGE,
		hasNextPage
	}
}

export function removeAllVideos() {
	return {
		type: REMOVE_ALL_VIDEOS,
		videos: []
	}
}

export function removeAllChannels() {
	return {
		type: REMOVE_ALL_CHANNELS,
		channels: []
	}
}

let ajaxRequest = null

export function fetchChannels(args) {
	if (ajaxRequest) {
		ajaxRequest.cancel()
	}
	ajaxRequest = axios.CancelToken.source()

	let url =
		apiBase +
		`/smart-list/channel?size=100&page=${args.pageNumber}&versionId=${args.versionId}`
	return async (dispatch) => {
		const result = await axios({
			method: 'POST',
			url: url,
			data: args.filters,
			cancelToken: ajaxRequest.token
		})
		try {
			if (result.status === 200) {
				if (result.data.length < 100) {
					dispatch(setHasNextPage(false))
				}
				dispatch(setChannels(result.data))
			}
		} catch (error) {
			alert('error fetching channels', error)
		}
	}
}

export function setChannels(channels) {
	return {
		type: SET_CHANNELS,
		channels
	}
}
