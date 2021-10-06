import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import 'source-map-support/register'
import { middyfy } from '@libs/lambda';
import { Post } from '../../models/post'
import PostRepository from '../../repositories/post.repository'
import schema from './schema';



const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event ) => {

  const postRepository = new PostRepository();
  const { author } = event.body;
  const { description } = event.body;
  const { title } = event.body;
  const { content } = event.body;
  const { id } = event.body;
  const blog: Post= { id, author, description, title,content, createdAt: new Date().toLocaleDateString()};
  const blogPartial: Partial<Post> = { ... blog, id }
  const update = await postRepository.updatePost(blogPartial);

  return {
    statusCode: 201,
    body: JSON.stringify({
        code: 0,
        message: 'Created successfully',
        data: update
    })
  };
}
  

export const main = middyfy(handler);
