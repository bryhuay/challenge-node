import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import 'source-map-support/register'
import { middyfy } from '@libs/lambda';
import schema from './schema';
import SwapiFilmRepository from '../../repositories/swapi-film.repository'



const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  
  const swapiRepository = new SwapiFilmRepository();
  const films : any = await swapiRepository.getAllFilms();
  if(!films && !films.data){
    return {
      statusCode: 200,
      body: JSON.stringify({
          code: 2,
          message: 'The service SWApi is not available',
          data: films.data
      })
    };
  }
 

  return {
    statusCode: 200,
    body: JSON.stringify({
        code: 0,
        message: 'List of films of SWAPI',
        data: films.data
    })
  };
}
  

export const main = middyfy(handler);
