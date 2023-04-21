import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tourist, TouristDocument } from '../tourist/schema/tourist.schema';
import { Agency, AgencyDocument } from '../agency/schema/agency.schema';
import { LoginAuthDto } from './dto/login-touris-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Tourist.name) private readonly touristModel: Model<TouristDocument>,
    @InjectModel(Agency.name) private readonly agencyModel: Model<AgencyDocument>,
    private jwtService: JwtService,
  ) {}

  async login(loginObject: LoginAuthDto, type: string) {
    const { email, password } = loginObject;
    let userModel: Model<TouristDocument | AgencyDocument>;
    let userNotFoundMsg: string;
    let passwordIncorrectMsg: string;
    if (type === 'tourist') {
      userModel = this.touristModel;
      userNotFoundMsg = 'USER_NOT_FOUND';
      passwordIncorrectMsg = 'PASSWORD_INCORRECT_TOURIST';
    } else if (type === 'agency') {
      userModel = this.agencyModel;
      userNotFoundMsg = 'AGENCY_NOT_FOUND';
      passwordIncorrectMsg = 'PASSWORD_INCORRECT_AGENCY';
    } else {
      throw new HttpException('INVALID_USER_TYPE', HttpStatus.FORBIDDEN);
    }

    const findUser = await userModel.findOne({ email });
    if (!findUser) throw new HttpException(userNotFoundMsg, HttpStatus.FORBIDDEN);
    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException(passwordIncorrectMsg, HttpStatus.FORBIDDEN);

    const payload = { id: findUser._id, email: findUser.email };
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };
    return data;
  }

  // async ValidateUserWithGoolge(profile: any): Promise<any> {
  //   const { googleId, email, name } = profile;

  //   let user;
  // }

  // async validateUser(details: any): Promise<T> {
  //   try {
  //     const { email, fullName, subject, provider } = details;
  //     const responsible = await this.BaseModel.findOne({
  //       provider,
  //       subject,
  //     });
  //     if (!responsible) {
  //       console.log('user not Found, creating...');
  //       const newResponsible = new this.BaseModel({
  //         email,
  //         name: fullName.split(' ')[0],
  //         lastName: fullName.split(' ')[1],
  //         provider,
  //         subject,
  //       });
  //       await newResponsible.save();
  //       return newResponsible;
  //     }
  //     return responsible;
  //   } catch (error) {
  //     throw new HttpException(
  //       `Could not validate ${this.modelName}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // async tourist(touristObjectLogin: LoginAuthDto) {
  //     const { email, password } = touristObjectLogin;
  //     console.log({ email, password })
  //     const findTourist = await this.touristModel.findOne({ email });
  //     console.log(findTourist)
  //     if (!findTourist) throw new HttpException('USER_NOT_FOUND', HttpStatus.FORBIDDEN);
  //     const checkPassword = await compare(password, findTourist.password)

  //     if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT_TOURIST', HttpStatus.FORBIDDEN);

  //     const payload = { id: findTourist._id, email: findTourist.email }
  //     const token = this.jwtService.sign(payload);

  //     const data = {
  //         user: findTourist,
  //         token,
  //     }
  //     return data;
  // }

  // async agency(agencyObjectLogin: LoginAuthDto) {
  //     const { email, password } = agencyObjectLogin;
  //     console.log({ email, password })
  //     const findAgency = await this.agencyModel.findOne({ email });
  //     console.log(findAgency)
  //     if (!findAgency) throw new HttpException('AGENCY_NOT_FOUND', HttpStatus.FORBIDDEN);
  //     const checkPassword = await compare(password, findAgency.password)

  //     if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT_AGENCY', HttpStatus.FORBIDDEN);

  //     const payload = { id: findAgency._id, email: findAgency.email }
  //     const token = this.jwtService.sign(payload);

  //     const data = {
  //         user: findAgency,
  //         token,
  //     }
  //     return data;
  // }
}
