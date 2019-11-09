
const swaggerjsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express")
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Vinyl API",
            description: "API Information that are used in application",
            constact: {
                name: "Vinyl Team"
            },
            servers: ["http://localhost:8000"]
        }
    },
    apis: ['lib/controller/*/*.js']
};

const swaggerDocs = swaggerjsDoc(swaggerOptions)
module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}


