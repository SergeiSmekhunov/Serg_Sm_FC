const express = require('express');

const {cacheRouter} = require('../routes');
const {BaseAppClass} = require('../common');


class ExpressConfig extends BaseAppClass{

	constructor() {
		super();
		this.app = express();
	}

	attachRoutes(){
		this.app.use('/caches', cacheRouter);
	}

	startListening() {
		this.app.listen(
			this.config.port,
			()=>this.logger.info(`App is listening at port ${this.config.port}`))
		;
	}
}


module.exports = ExpressConfig;