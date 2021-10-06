export default {
  type: "object",
  properties: {
    author: { type: 'string' },
    description: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' }
  },
  required: ['author','title','description']
} as const;
