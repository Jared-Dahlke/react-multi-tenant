import axios from '../../../axiosConfig'
import defaultAxios from 'axios'
import config from '../../../config.js'
import {
	SET_CHANNELS,
	SET_VIDEOS,
	REMOVE_ALL_VIDEOS,
	REMOVE_ALL_CHANNELS,
	SET_CHANNELS_HAS_NEXT_PAGE,
	SET_VIDEOS_HAS_NEXT_PAGE,
	SET_CHANNELS_IS_LOADING,
	SET_VIDEOS_IS_LOADING
} from '../../action-types/engage/listBuilder'

import {
	channelsSchema,
	videosSchema
} from '../../../schemas/Engage/Lists/schemas'
import numeral from 'numeral'
import countryCodeToFlagEmoji from 'country-code-to-flag-emoji'
var dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

const apiBase = config.api.listBuilderUrl

export function fetchVideos(args) {
	let url =
		apiBase +
		`/smart-list/video?size=100&page=${args.pageNumber}&versionId=${args.versionId}`
	return async (dispatch) => {
		dispatch(setVideosIsLoading(true))
		try {
			const result = await defaultAxios({
				method: 'POST',
				url: url,
				data: args.filters
			})

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
				let formattedVideos = formatVideos(result.data)
				dispatch(setVideos(formattedVideos))
				dispatch(setVideosIsLoading(false))
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

export function setChannelsHasNextPage(channelsHasNextPage) {
	return {
		type: SET_CHANNELS_HAS_NEXT_PAGE,
		channelsHasNextPage
	}
}

export function setVideosIsLoading(videosIsLoading) {
	return {
		type: SET_VIDEOS_IS_LOADING,
		videosIsLoading
	}
}

export function setChannelsIsLoading(channelsIsLoading) {
	return {
		type: SET_CHANNELS_IS_LOADING,
		channelsIsLoading
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
		dispatch(setChannelsIsLoading(true))
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
				dispatch(setChannelsHasNextPage(false))
			}
			let formattedChannels = formatChannels(result.data)
			dispatch(setChannels(formattedChannels))
			dispatch(setChannelsIsLoading(false))
		}
	}
}

const formatChannels = (channels) => {
	for (const item of channels) {
		item.createDateDisplay = dayjs(item.created).calendar()
		item.createDateTooltip = dayjs(item.created).calendar()

		item.countryDisplay = countryCodeToFlagEmoji(item.countryCode)
		item.countryTooltip = item.countryName

		item.categoryDisplay = item.categoryName
		item.categoryTooltip = item.categoryName

		let name = item.name.replace(/\s/g, '').length ? item.name : '[No name]'
		item.nameDisplay = name

		let description
		if (!item.description) {
			description = '[No description]'
		} else if (!item.description.replace(/\s/g, '').length) {
			description = '[No description]'
		} else {
			description = item.description.substring(0, 500)
		}
		item.nameTooltip = item.nameDisplay + ' - ' + description

		item.subscribersDisplay = numeral(item.subscribers).format('0a')
		item.subscribersTooltip = numeral(item.subscribers).format('0,0')

		item.videosDisplay =
			numeral(item.filteredVideoCount).format('0a') +
			'/' +
			numeral(item.allVideoCount).format('0a')
		item.videosTooltip = `Based off of your filters there are ${numeral(
			item.filteredVideoCount
		).format('0,0')} videos you can see, out of the ${numeral(
			item.allVideoCount
		).format('0,0')} videos in our database for this channel.`

		item.viewsDisplay = numeral(item.views).format('0a')
		item.viewsTooltip = numeral(item.views).format('0,0')
	}
	return channels
}

const formatVideos = (videos) => {
	for (const item of videos) {
		item.createDateDisplay = dayjs(item.published).calendar()
		item.createDateTooltip = dayjs(item.published).calendar()

		item.nameDisplay = item.name.replace(/\s/g, '').length
			? item.name
			: '[No name]'

		let description
		if (!item.description) {
			description = '[No description]'
		} else if (!item.description.replace(/\s/g, '').length) {
			description = '[No description]'
		} else {
			description = item.description.substring(0, 500)
		}
		item.nameTooltip = description

		item.categoryDisplay = item.categoryName
		item.categoryTooltip = item.categoryName

		item.subscribersDisplay = numeral(item.subscribers).format('0a')
		item.subscribersTooltip = numeral(item.subscribers).format('0,0')

		item.videosDisplay =
			numeral(item.filteredVideoCount).format('0a') +
			'/' +
			numeral(item.allVideoCount).format('0a')

		item.videosTooltip =
			numeral(item.filteredVideoCount).format('0,0') +
			'/' +
			numeral(item.allVideoCount).format('0,0')

		item.viewsDisplay = numeral(item.views).format('0a')
		item.viewsTooltip = numeral(item.views).format('0,0')

		item.commentsDisplay = numeral(item.comments).format('0a')
		item.commentsTooltip = numeral(item.comments).format('0,0')

		item.dislikesDisplay = numeral(item.dislikes).format('0a')
		item.dislikesTooltip = numeral(item.dislikes).format('0,0')

		item.likesDisplay = numeral(item.likes).format('0a')
		item.likesTooltip = numeral(item.likes).format('0,0')
	}
	return videos
}

export function setChannels(channels) {
	return {
		type: SET_CHANNELS,
		channels
	}
}
