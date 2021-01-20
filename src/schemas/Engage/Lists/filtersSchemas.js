import * as Yup from 'yup'

export const iabCategoriesObjValidation = Yup.array().of(
	Yup.object().shape({
		id: Yup.string().required(),
		name: Yup.string().required(),
		tier: Yup.number().required(),
		children: Yup.array().required()
	})
)

export const youtubeCategoriesObjValidation = Yup.array().of(
	Yup.object().shape({
		categoryId: Yup.number().required(),
		categoryName: Yup.string().required()
	})
)

export const countriesObjValidation = Yup.array().of(
	Yup.object().shape({
		countryCode: Yup.string().required(),
		countryName: Yup.string().required()
	})
)

export const languagesObjValidation = Yup.array().of(
	Yup.object().shape({
		languageCode: Yup.string().required(),
		languageName: Yup.string().required()
	})
)
