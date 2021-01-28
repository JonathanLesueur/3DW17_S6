// recipe-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
    const modelName = 'recipe';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    
    const RecipeStepSchema = new Schema({
        content: {type: String, required: true}
    });
    const RecipeIngredientSchema = new Schema({
        ingredientId: {type: String, required: true},
        quantity: {type: Number, required: true}
    });
    
    const RecipeSchema = new Schema({
        name: { type: String, required: true },
        type: { type: String, required: true, enum: ['link', 'details']},
        details: { 
            type: Array,
            required: [
                function(this: any) {
                    return this.type == 'details';
                }
            ],
            instructions: {type: [RecipeStepSchema]},
            ingredients: {type: [RecipeIngredientSchema]}
        },
        url: {
            type: String,
            required: [
                function(this: any) {
                    return this.type == 'link';
                }
            ]}
        }, {
            timestamps: true
        });
        
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
            (mongooseClient as any).deleteModel(modelName);
        }
        return mongooseClient.model<any>(modelName, RecipeSchema);
    }
    