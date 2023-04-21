import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository<T> {
  protected readonly BaseModel: Model<T>;

  protected readonly modelName: string;

  constructor(baseModel: Model<T>) {
    this.BaseModel = baseModel;
    this.modelName = this.BaseModel.modelName;
  }

  // Busca por id
  async findById(id: string): Promise<T> {
    const user = await this.BaseModel.findById(id);
    return user;
  }

  // Busca todos
  async findAll(): Promise<T[]> {
    const user = await this.BaseModel.find().exec();
    return user;
  }

  // Busca por email
  async findByEmail(email: string): Promise<T> {
    const user = await this.BaseModel.findOne({ email }).exec();
    return user;
  }

  // Crea
  async create(object: any): Promise<T> {
    try {
      const created = await this.BaseModel.create(object);
      return created.save();
    } catch (error) {
      throw new HttpException(
        `Could not create ${this.modelName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(key: any): Promise<T> {
    return this.BaseModel.findOne({ key }).exec();
  }
  // Actualiza
  // async update(id:string, object: any): Promise<T>{
  //     const updated = await this.BaseModel.findByIdAndUpdate(object,object);
  //     return updated.save();
  // }

  // Validacion de usuario por Google
  async validateUser(details: any): Promise<T> {
    try {
      const { email, fullName, subject, provider } = details;
      const responsible = await this.BaseModel.findOne({
        provider,
        subject,
      });
      if (!responsible) {
        console.log('user not Found, creating...');
        const newResponsible = new this.BaseModel({
          email,
          name: fullName.split(' ')[0],
          lastName: fullName.split(' ')[1],
          provider,
          subject,
        });
        await newResponsible.save();
        return newResponsible;
      }
      return responsible;
    } catch (error) {
      throw new HttpException(
        `Could not validate ${this.modelName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
