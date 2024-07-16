import { GraphQLObjectType, GraphQLList } from 'graphql';
import { CategoryType, UserType } from './schema.js';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
    },
    categories: {
      type: new GraphQLList(CategoryType),
    },
  },
});

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  user: () => ({
    userProfile_renderer: {
      name: 'Lê Xuân Tiến',
      age: 27,
    },
  }),
  categories: () => [
    { id: '1', name: 'Xi Măng', parentId: null },
    { id: '2', name: 'Thép', parentId: null },
    { id: '3', name: 'Gạch', parentId: null },
    { id: '4', name: 'Cát', parentId: null },
    { id: '5', name: 'Đá', parentId: null },
    { id: '6', name: 'Sơn', parentId: null },
    { id: '7', name: 'Cửa Kính', parentId: null },
    { id: '8', name: 'Nội Thất', parentId: null },
    { id: '9', name: 'Đèn Trang Trí', parentId: null },
    { id: '10', name: 'Vật Liệu Chịu Nhiệt', parentId: null },
    { id: '11', name: 'Thiết Bị Vệ Sinh', parentId: null },
    { id: '12', name: 'Thiết Bị Điện', parentId: null },
    { id: '13', name: 'Cây Cảnh', parentId: null },
    { id: '14', name: 'Vật Liệu Lót Sàn', parentId: null },
    { id: '15', name: 'Thạch Cao', parentId: null },
  ],
};

export { QueryType, rootValue };
