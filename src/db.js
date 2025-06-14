const mongoose = require('mongoose');

module.exports = {
  // 굳이 사용하지 않아도 되는 코드 -> 16v 이상이면 가능
  connect: DB_HOST => {
    // 몽고 드라이버의 업데이트된 URL String Parser 사용
    mongoose.set('useNewUrlParser', true);
    // findAndModify() 대신 findOneAndUpdate() 사용
    mongoose.set('useFindAndModify', false);
    // ensureIndex() 대신 createIndex() 사용
    mongoose.set('useCreateIndex', true);
    // 새로운 서버 디스커버리 및 모니터링 엔진 사용
    mongoose.set('useUnifiedTopology', true);
    // DB에 연결
    mongoose.connect(DB_HOST);
    // 연결에 실패하면 에러 로깅
    mongoose.connection.on('error', err => {
      console.log(err);
      console.log(
        'MongoDB connections error. Please make sure MongoDB is running.'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connections.close();
  }
};
