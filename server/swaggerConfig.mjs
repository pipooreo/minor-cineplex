import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My API",
    description: "API documentation",
  },
  host: "localhost:4000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.mjs"]; // Add more endpoint files as needed

swaggerAutogen()(outputFile, endpointsFiles);
