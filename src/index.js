const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

// graphQL 스키마 언어로 스키마를 구성
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// 스키마 필드를 위한 리졸버 함수 제공
const resolvers = {
  Query: {
    hello: () => 'Hello, World!'
  }
};

// 아폴로 서버 설정
const server = new ApolloServer({ typeDefs, resolvers });

// 아폴로 그래프QL 미들웨어를 적용하고 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => res.send('Hello, Joohyun'));

app.listen({ port }, () =>
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  )
);
