const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema');

require('dotenv').config();
const db = require('./db');

const app = express();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// mongodb connection
db.connect(DB_HOST);

// 임시 기본 인메모리 데이터
let notes = [
  { id: '1', content: 'This is a first note', author: 'Joohyn Choi' },
  { id: '2', content: 'This is a second note', author: 'Kyeongeun Jo' },
  { id: '3', content: 'This is a third note', author: 'Inyoung Jang' }
];

// 스키마 필드를 위한 리졸버 함수 제공
const resolvers = {
  Query: {
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id == args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: args.author
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

// 아폴로 서버 설정
const server = new ApolloServer({ typeDefs, resolvers });

// 아폴로 그래프QL 미들웨어를 적용하고 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  )
);
