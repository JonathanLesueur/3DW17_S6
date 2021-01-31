// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    
    if(context.result.data != undefined){
      context.result.data = context.result.data.filter(function(item:any){return item.deletedAt === undefined || item.deletedAt === -1});
    } else if(typeof context.result?.deletedAt === "string"){
      throw new Error('Softdeleted');
    }
    
    
    return context;
  };
};