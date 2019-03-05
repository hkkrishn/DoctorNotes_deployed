if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI:'mongodb://hkkrishn:Hophop12@cluster0-pu2ry.mongodb.net/test?retryWrites=true'}
} else{
  module.exports = {mongoURI:'mongodb://localhost/DoctorNotes-dev'}
}