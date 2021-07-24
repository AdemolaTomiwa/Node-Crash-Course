// const Person = require('./person');

// const person1 = new Person('John Doe', 30);

// person1.greeting();

// const Logger = require('./logger');
// const fs = require('fs');
// const path = require('path');

// const logger = new Logger();

// logger.on('message', (data) => {
//    fs.mkdir(path.join(__dirname, '/logs'), {}, (err) => {
//       if (err) throw err;
//       console.log('Folder Created');
//    });

//    fs.writeFile(
//       path.join(__dirname, '/logs', 'logs.txt'),
//       `New Id: ${data.id} and New Msg: ${data.msg}`,
//       (err) => {
//          if (err) throw err;
//          console.log('Already Written');
//       }
//    );
// });

// logger.log('Hello World');

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
   // if (req.url === '/') {
   //    fs.readFile(
   //       path.join(__dirname, 'public', 'index.html'),
   //       {},
   //       (err, content) => {
   //          if (err) throw err;
   //          res.writeHead(200, { 'Content-Type': 'text/html' });
   //          res.end(content);
   //       }
   //    );
   // }

   // if (req.url === '/api/users') {
   //    const users = [
   //       { name: 'Bob Smith', age: 40 },
   //       { name: 'John Doe', age: 70 },
   //    ];
   //    res.writeHead(200, { 'Content-Type': 'application/json' });
   //    res.end(JSON.stringify(users));
   // }

   let filePath = path.join(
      __dirname,
      'public',
      req.url === '/' ? 'index.html' : req.url
   );

   const extname = path.extname(filePath);

   let contentType = 'text/html';

   switch (extname) {
      case '.js':
         contentType = 'text/javascript';
         break;
      case '.css':
         contentType = 'text/css';
         break;
      case '.json':
         contentType = 'application/json';
         break;
      case '.png':
         contentType = 'image/png';
         break;
      case '.jpg':
         contentType = 'image/jpg';
         break;
   }

   fs.readFile(filePath, (err, content) => {
      if (err) {
         if (err.code === 'ENOENT') {
            fs.readFile(
               path.join(__dirname, 'public', '404.html'),
               {},
               (err, content) => {
                  if (err) throw err;
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end(content, 'utf8');
               }
            );
         } else {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
         }
      } else {
         res.writeHead(200, { 'Content-Type': contentType });
         res.end(content, 'utf8');
      }
   });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Up and Running on ${PORT}`));
