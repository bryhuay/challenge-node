import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Post } from '../models/post'

export default class PostRepository {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todoTable = process.env.POST_TABLE) {
  }

  async getAllPost(): Promise<Post[]> {
    const result = await this.docClient.scan({
      TableName: this.todoTable
    }).promise()

    return result.Items as Post[]
  }

  async createPost(todo:Post): Promise<Post> {
    await this.docClient.put({
      TableName: this.todoTable,
      Item: todo
    }).promise()

    return todo
  }
  async updatePost(partialTodo: Partial<Post>): Promise<Post> {
    const updated = await this.docClient.update({
      TableName: this.todoTable,
      Key: { 'id': partialTodo.id },
      UpdateExpression: 'set #author = :author, description = :description, title = :title, content = :content',
      ExpressionAttributeNames: {
        '#author': 'author'
      },
      ExpressionAttributeValues: {
        ':author': partialTodo.author,
        ':description': partialTodo.description,
        ':title': partialTodo.title,
        ':content': partialTodo.content
      },
      ReturnValues: 'ALL_NEW'
    }).promise()
    
    return updated.Attributes as Post
  }
  async deletePostById(id: string) {
    return this.docClient.delete({
      TableName: this.todoTable,
      Key: { 'id': id }
    }).promise()
  }

  
  
}

function createDynamoDBClient() { 
  
  return new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  
}