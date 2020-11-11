const development = {
	environment: 'development',
	api: {
		userAccountUrl: 'http://localhost:4000',
		listBuilderUrl: 'http://localhost:4200'
	}
}

const demo = {
	environment: 'demo',
	api: {
		userAccountUrl:
			'https://api-cont-intell-user-account-demo-zu7blp7gxa-uw.a.run.app',
		listBuilderUrl: 'doesntExistYet'
	}
}

const staging = {
	environment: 'staging',
	api: {
		userAccountUrl:
			'https://api-cont-intell-user-account-staging-zu7blp7gxa-uw.a.run.app',
		listBuilderUrl:
			'https://api-cont-intell-list-builder-staging-zu7blp7gxa-uw.a.run.app'
	}
}

const production = {
	environment: 'production',
	api: {
		userAccountUrl:
			'https://api-cont-intell-user-account-prod-zu7blp7gxa-uw.a.run.app',
		listBuilderUrl: 'doesntExistYet'
	}
}

var config = production
switch (process.env.REACT_APP_STAGE) {
	case 'staging':
		config = staging
		break
	case 'demo':
		config = demo
		break
	case 'development':
		config = development
		break
	default:
		config = production
}

export default {
	// Add common config values here
	// MAX_ATTACHMENT_SIZE: 5000000,
	...config
}
