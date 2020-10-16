import * as Yup from 'yup'

export const accountsObjValidation = Yup.array()
	.min(1, 'User is not associated with any account')
	.of(
		Yup.object().shape({
			accountId: Yup.number().required(),
			accountLevelId: Yup.number().required(),
			accountLevelName: Yup.string().required(),
			accountMargin: Yup.number().required(),
			accountName: Yup.string().required(),
			accountTypeId: Yup.number().required(),
			accountTypeName: Yup.string().required(),
			contactEmail: Yup.string().required(),
			contactName: Yup.string().required(),
			// parentAccountId: Yup.number(),
			// parentAccountName: Yup.string().required(),
			children: Yup.array().nullable()
		})
	)
	.nullable()

export const usersWithRolesObjValidation = Yup.array()
	.min(1, 'No Users associated with account')
	.of(
		Yup.object().shape({
			userId: Yup.number().required(),
			firstName: Yup.string().required(),
			lastName: Yup.string().required(),
			email: Yup.string().required(),
			company: Yup.string().required(),
			phoneNumber: Yup.string().required(),
			userName: Yup.string().required(),
			userType: Yup.string().required(),
			roles: Yup.array()
				.min(1, 'No Roles associated with User')
				.of(
					Yup.object().shape({
						roleId: Yup.number().required(),
						roleName: Yup.string().required(),
						roleDescription: Yup.string().required(),
						userType: Yup.string().required()
					})
				)
		})
	)

export const rolesAndPermissionsObjValidation = Yup.array()
	.min(1, 'No roles associated with account')
	.of(
		Yup.object().shape({
			roleId: Yup.number().required(),
			roleName: Yup.string().required(),
			roleDescription: Yup.string().required(),
			userType: Yup.string().required(),
			default: Yup.string().required(),
			permissions: Yup.array()
				.min(1, 'No permissions for given role')
				.of(
					Yup.object()
					// .shape({
					//   permissionId: Yup.number().required(),
					//   permissionName: Yup.string().required(),
					//   permissionDescription: Yup.string().required(),
					//   moduleName: Yup.string().required()
					// })
				)
		})
	)

export const userObjValidation = Yup.object().shape({
	userId: Yup.number().required(),
	firstName: Yup.string().required(),
	lastName: Yup.string().required(),
	email: Yup.string().required(),
	company: Yup.string().required(),
	userType: Yup.string().required(),
	roles: Yup.array(),
	accounts: Yup.array()
})

export const accountTypesObjValidation = Yup.array()
	.min(1, 'No Account types available')
	.of(
		Yup.object().shape({
			accountTypeId: Yup.number().required(),
			accountTypeName: Yup.string().required()
		})
	)

export const brandProfilesObjValidation = Yup.array().of(
	Yup.object().shape({
		accountId: Yup.number().required(),
		brandName: Yup.string().required(),
		brandProfileId: Yup.number().required(),
		twitterProfileUrl: Yup.string().required(),
		websiteUrl: Yup.string().required(),
		competitors: Yup.array().of(
			Yup.object()
			// .shape({
			//   brandProfileId: Yup.number().required(),
			//   competitorId: Yup.number().required(),
			//   competitorName: Yup.string().required(),
			//   websiteUrl: Yup.string().required(),
			//   twitterProfileUrl: Yup.string().required()
			// })
		)
	})
)
