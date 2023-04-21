import { Document } from 'mongoose';

export interface AgencyUserInterface extends Document {
  agencyUserId: number;

  agencyUserName: string;

  password: string;

  email: string;

  transportIds: string;

  roleId: number;

  phoneNumber: number;

  isActive: boolean;
}
