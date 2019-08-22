import { prop, Typegoose } from 'typegoose'

export class Plan extends Typegoose {
  @prop()
  url: string

  @prop({ required: true })
  keyword: string

  @prop()
  platform: string

  @prop()
  ranking: number

  @prop({ default: 1 })
  status: number

  @prop()
  date: Date

  // static paginate: () => any
  [key:string]: any  //允许额外的方法

}

export const PlanModel = new Plan().getModelForClass(Plan, {
  schemaOptions: {
    collection: 'plans'
  }
})