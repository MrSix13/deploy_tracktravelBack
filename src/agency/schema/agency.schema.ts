import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgencyDocument = HydratedDocument<Agency>;

@Schema()
export class Agency {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  cnpj: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  legalTax: string;

  @Prop()
  isActive: boolean;

  @Prop()
  AgencyPayment: string[];

  @Prop()
  planType: string;

  @Prop()
  guide: string;

  @Prop()
  responsable: string;

  @Prop()
  banners: string[];

  //   @Prop({ type: [{ type: ObjectId, ref: 'AgencyUser' }] })
  //   agencyUsers: AgencyUser[];

  @Prop()
  sellers: string[];

  @Prop()
  invitationSended: string[];

  @Prop()
  trip: string[];

  @Prop()
  googleId: string;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
