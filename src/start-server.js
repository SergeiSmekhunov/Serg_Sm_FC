const {MongooseConnector, ExpressConfig} = require('./init-config');

async function startApp() {
	await new MongooseConnector().getConnection();
	const expressConfig = new ExpressConfig();
	expressConfig.attachRoutes();
	expressConfig.startListening();
}

startApp();
