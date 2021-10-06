export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    author: { type: 'string' },
    description: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' }
  },
  required: ['id','author','title','description','content']
} as const;
