import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResponsibleDocument = HydratedDocument<Responsible>;

// enum TripState {
//   PLANNED = 'planned',
//   IN_PROGRESS = 'in_progress',
//   COMPLETED = 'completed'
// }

// enum ResponsibleType {
//   DRIVER = 'driver',
//   GUIDE = 'guide'
// }

@Schema()
export class Responsible {
  // @Prop({ required: true })
  // firstName: string;

  // @Prop({ required: true })
  // lastName: string;

  // @Prop({
  //   required: true
  // })
  // email: string;

  // @Prop()
  // password: string;

  // @Prop({ type: [String] })
  // lenguages: string[];

  // @Prop()
  // profilePicture: string;

  // @Prop()
  // experience: string;

  // @Prop()
  // phoneNumber: string;

  // @Prop({ enum: TripState })
  // tripState: TripState;

  // @Prop()
  // transportLicense: string;

  // @Prop()
  // provider: string;

  // @Prop()
  // subject: string;

  // @Prop({ enum: ResponsibleType })
  // responsibleType: ResponsibleType;

  // @Prop()
  // rol: string;

  // AGENCY
  //   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agency' }] })
  //   agency: Agency[]; // importar la clase Agency

  // ESTO LO VEO MAS PARA TRIP, PERO REMPLAZANDO TRIP-ID POR RESPONSIBLE-ID

  // TOURIST-TRIP-RATING  O EN TRIP = TOURIST-RESPONSIBLE-RATING
  //   @Prop([
  //     {
  //       trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  //       tourists: [
  //         { touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' }, rating: Number }
  //       ],
  //       totalTourist: {type: Number}
  //     }
  //   ])
  //   tourist_trip_rating: { trip: Trip; tourists: { touristId: Tourist; rating: number }[];  totalTourist: Number}[];

  @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;
  
    @Prop({ required: true })
    email: string;

    @Prop({required:true})
    role: string;

    @Prop({ required: true })
    provider: string

    @Prop({ required: true })
    subject: string
}

export const ResponsibleSchema = SchemaFactory.createForClass(Responsible);
