import { Typegoose, prop } from "typegoose";

export class Site extends Typegoose {
  @prop()
  url: string

  @prop({ default: 1 })
  record: number

  @prop()
  keyword: string

  @prop()
  snapshot_time: Date

  @prop()
  created_at: Date
}

export const SiteModel = new Site().getModelForClass(Site, {
  schemaOptions: {
    collection: 'sites'
  }
})
