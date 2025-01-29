import app from './app';
import configs from './app/configs';
import type { Server } from 'http';

let server: Server;

const bootStrap = async () => {
	try {
		await configs.connectDB();
		server = app.listen(configs.port, () => {
			console.log(
					`Server is Listening on Port: ${configs.port}`,
			);
		});
	} catch (error) {
		console.log(error)
	}
};

bootStrap().catch(console.dir);
