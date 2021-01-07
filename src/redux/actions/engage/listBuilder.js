import axios from '../../../axiosConfig'
import defaultAxios from 'axios'
import config from '../../../config.js'
import {
	SET_CHANNELS,
	SET_VIDEOS,
	REMOVE_ALL_VIDEOS,
	REMOVE_ALL_CHANNELS,
	SET_HAS_NEXT_PAGE,
	SET_VIDEOS_HAS_NEXT_PAGE
} from '../../action-types/engage/listBuilder'

import {
	channelsSchema,
	videosSchema
} from '../../../schemas/Engage/Lists/schemas'
import numeral from 'numeral'
var dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

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
					dispatch(setVideosHasNextPage(false))
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

export function setVideosHasNextPage(videosHasNextPage) {
	return {
		type: SET_VIDEOS_HAS_NEXT_PAGE,
		videosHasNextPage
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
		const result = await axios({
			method: 'POST',
			url: url,
			data: args.filters
		})

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
			let formattedChannels = formatChannels(result.data)
			dispatch(setChannels(formattedChannels))
		}
	}
}

const formatChannels = (channels) => {
	for (const item of channels) {
		let abbreviatedDescription
		if (!item.description) {
			abbreviatedDescription = '[No description]'
		} else if (item.description.length > 40) {
			abbreviatedDescription = item.description.substring(0, 40) + '...'
		} else if (!item.description.replace(/\s/g, '').length) {
			abbreviatedDescription = '[No description]'
		} else {
			abbreviatedDescription = item.description
		}
		item.abbreviatedDescription = abbreviatedDescription

		let createDate = item.created
			? dayjs(item.created).calendar()
			: dayjs(item.published).calendar()
		item.createDate = createDate
		let name = item.name.replace(/\s/g, '').length ? item.name : '[No name]'
		item.name = name
		let description
		if (!item.description) {
			description = '[No description]'
		} else if (!item.description.replace(/\s/g, '').length) {
			description = '[No description]'
		} else {
			description = item.description.substring(0, 500)
		}
		item.description = description
		item.subscribersCount = numeral(item.subscribers).format('0a')
		item.videosCount =
			numeral(item.filteredVideoCount).format('0a') +
			'/' +
			numeral(item.allVideoCount).format('0a')
		item.viewsCount = numeral(item.views).format('0a')
	}
	return channels
}

export function setChannels(channels) {
	return {
		type: SET_CHANNELS,
		channels
	}
}
