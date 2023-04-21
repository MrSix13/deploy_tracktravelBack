import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type TouristDocument = HydratedDocument<Tourist>;

@Schema()
export class Tourist {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop()
  tripList: string[];

  @Prop()
  hotel: string;

  @Prop()
  passport: string;

  @Prop()
  payment: boolean;

  @Prop()
  agencyIds: ObjectId[];

  @Prop()
  responsibleAssociated: mongoose.Schema.Types.ObjectId;

  @Prop()
  resetToken: string;

  @Prop()
  googleId: string;

  @Prop()
  resetTokenExpiresAt: Date;
}
export const TouristSchema = SchemaFactory.createForClass(Tourist);
