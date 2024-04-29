const swaggerAutogen= require('swagger-autogen')

const doc ={
    info :{
        title:'Node js, Express js+ Mysql API',
        description:'Node js, Express js+ Mysql API',
    },
    host: 'localhost:5000',
    schemes:['http'],
};

const outputFile = './swagger-output.json'
const endpointsFiles =['./server.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(()=>{
    require('./server.js');
});