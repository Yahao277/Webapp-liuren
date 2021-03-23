import config from './config'
import app from './app'
import mongoose,{ConnectionOptions} from 'mongoose'

// Connection URL
(async () => {
  try {
    const mongooseOptions: ConnectionOptions =   
    { useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true ,
    useFindAndModify: false
  }
    const db = await mongoose.connect(
      config.mongoUri,
      mongooseOptions
    );

    console.log("Databse is connected to: ", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();


app.listen(8080, () => {
  console.info('Server started on port %s.', 8080)
}).on('error',(err) =>{
  console.log(err)
})
