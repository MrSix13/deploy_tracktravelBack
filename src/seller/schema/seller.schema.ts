import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tourist } from '../../tourist/schema/tourist.schema';
import { Agency } from '../../agency/schema/agency.schema';

export type SellerDocument = HydratedDocument<Seller>;

@Schema()
export class Seller {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: string[];

  @Prop()
  profilePicture: string[];

  // @Prop()
  // bankAccount: {};

  @Prop()
  profits: string;

  @Prop()
  languages: string[];

  @Prop()
  nationality: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agency' }] })
  agencies: Agency[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' }] })
  mySelling: Tourist[];
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
