const Hapi = require('@hapi/hapi');
const routes = require('./routes'); // Assuming routes.js defines routes

const init = async () => {
  try {
    // Declare the server variable here
    const server = Hapi.server({
      port: 5000,
      host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
      routes: {
        cors: {
          origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['*'] // Restrict CORS in production (replace with allowed origins)
        }
      }
    });

    await server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1); // Exit with an error code
  }
};

init();
