import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgencyUserDocument = HydratedDocument<AgencyUser>;
@Schema()
export class AgencyUser {
  @Prop()
  agencyUserId: string;

  @Prop({ required: true })
  agencyUserName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  transportIds: string;

  @Prop()
  roleId: string;

  @Prop()
  isActive: boolean;
}

export const AgencyUserSchema = SchemaFactory.createForClass(AgencyUser);
