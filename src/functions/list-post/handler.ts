import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import 'source-map-support/register'
import { middyfy } from '@libs/lambda';
import { Post } from '../../models/post'
import PostRepository from '../../repositories/post.repository'
import schema from './schema';



const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {

  const postRepository = new PostRepository();
  const posts: Post[] = await postRepository.getAllPost();

  return {
    statusCode: 200,
    body: JSON.stringify({
        code: 0,
        message: 'List of posts',
        data: posts
    })
  };
}
  

export const main = middyfy(handler);
