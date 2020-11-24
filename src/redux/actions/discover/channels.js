import axios from '../../../axiosConfig'
import defaultAxios from 'axios'
import config from '../../../config.js'
import {
	SET_CHANNELS,
	SET_VIDEOS,
	REMOVE_ALL_VIDEOS,
	REMOVE_ALL_CHANNELS
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

export function fetchChannels(args) {
	let url =
		apiBase +
		`/smart-list/channel?size=100&page=${args.pageNumber}&versionId=${args.versionId}`
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
