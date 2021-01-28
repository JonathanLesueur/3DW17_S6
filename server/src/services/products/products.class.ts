import { Id, Params } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import slugify from 'slugify';
import { Application } from '../../declarations';

export class Products extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async _get(id: Id, params?: Params) {
      let result = await super._get(id, params);
      result.slug = slugify(result.name, { lower: true });
      return result;
  }
}
