import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import 'source-map-support/register'
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import PostRepository from '../../repositories/post.repository'
import schema from './schema';



const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  => {

  const id = event.pathParameters.id
  const postRepository = new PostRepository();
  await postRepository.deletePostById(id);

  return {
    statusCode: 200,
    body: JSON.stringify({
        code: 0,
        message: 'Post deleted',
        data: true
    })
  };
}
  

export const main = middyfy(handler);
