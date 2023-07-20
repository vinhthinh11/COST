const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
console.log(process.env);
app.listen(process.env.PORT || 3000, _ => {
  console.log('server is running');
});
