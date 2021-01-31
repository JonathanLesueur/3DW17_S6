import { softDelete } from "feathers-hooks-common";
import { HookContext } from "@feathersjs/feathers";

export default {
    before: {
        all: [softDelete({
            // context is the normal hook context
            deletedQuery: async context => {
                return { deletedAt: -1};
            },
            removeData: async context => {
                return { deletedAt: new Date().toISOString().toString()  };
            }
        })],
        find: [],
        get: [],
        create: [(context: any) => {  
            context.data.deletedAt = -1;
        }],
        update: [],
        patch: [],
        remove: []
    },
    
    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },
    
    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
