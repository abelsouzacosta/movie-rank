import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'movies',
  timestamps: true,
})
export class Movie {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  duration: string;

  @Prop({ required: false, type: Number, default: 0 })
  note: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
