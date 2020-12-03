import axios from '../../../axiosConfig'
import defaultAxios from 'axios'
import config from '../../../config.js'
import {
	SET_CHANNELS,
	SET_VIDEOS,
	REMOVE_ALL_VIDEOS,
	REMOVE_ALL_CHANNELS,
	SET_HAS_NEXT_PAGE
} from '../../action-types/engage/listBuilder'

import {
	channelsSchema,
	videosSchema
} from '../../../schemas/Engage/Lists/schemas'

const apiBase = config.api.listBuilderUrl

let fetchVideosRequest = null

export function fetchVideos(args) {
	if (fetchVideosRequest) {
		fetchVideosRequest.cancel()
	}
	fetchVideosRequest = axios.CancelToken.source()

	let url =
		apiBase +
		`/smart-list/video?size=100&page=${args.pageNumber}&versionId=${args.versionId}`
	return async (dispatch) => {
		try {
			const result = await defaultAxios({
				method: 'POST',
				url: url,
				data: args.filters,
				cancelToken: fetchVideosRequest.token
			})
			//	const result = await defaultAxios.get(url, {)

			if (result.status === 200) {
				videosSchema.validate(result.data).catch((err) => {
					console.log(err.name, err.errors)
					alert(
						'we received different data from the api than expected from fetchVideos, see console log for more details'
					)
				})

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

let fetchChannelsRequest = null

export function fetchChannels(args) {
	if (fetchChannelsRequest) {
		fetchChannelsRequest.cancel()
	}
	fetchChannelsRequest = axios.CancelToken.source()

	let url =
		apiBase +
		`/smart-list/channel?size=100&page=${args.pageNumber}&versionId=${args.versionId}`
	return async (dispatch) => {
		const result = await axios({
			method: 'POST',
			url: url,
			data: args.filters,
			cancelToken: fetchChannelsRequest.token
		})
		try {
			if (result.status === 200) {
				channelsSchema.validate(result.data).catch((err) => {
					console.log(err.name, err.errors)
					alert(
						'we received different data from the api than expected from fetchChannels, see console log for more details'
					)
				})
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
