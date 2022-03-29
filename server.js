var express = require("express"),
    bodyParser = require("body-parser");
swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use("/books", require("./routes/books"));

const PORT = process.env.PORT || 4000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de ejemplo INNOVARE SRL",
            version: "0.1.0",
            description:
                "API de ejemplo documentada con swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "INNOVARE SRL",
                url: "https://www.innovare.com.ar",
                email: "info@innovare.com.ar",
            },
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["./routes/books.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);



app.listen(PORT);

console.debug("Server listening on port: " + PORT);