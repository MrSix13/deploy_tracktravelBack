import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AgencyModule } from './agency/agency.module';
import { BannerModule } from './banner/banner.module';
import { SellerModule } from './seller/seller.module';
import { TripModule } from './trip/trip.module';
import { AdminModule } from './admin/admin.module';
import { RoleModule } from './role/role.module';
import { InvitationModule } from './invitation/invitation.module';
import { ChatModule } from './chat/chat.module';
import { TouristModule } from './tourist/tourist.module';
import { ClaimModule } from './claim/claim.module';
import { ResponsibleModule } from './responsible/responsible.module';
import { AuthTouristModule } from './auth/auth.module';
import { RepositoryModule } from './repository/repository.module';
import { AppController } from './app.controllers';
import { GoogleAuthService } from './auth/google.service';
import { AgencyService } from './agency/agency.service';
import { TouristService } from './tourist/tourist.service';
import { AgencyRepository } from './agency/agency.repository';
import { TouristRepository } from './tourist/tourist.repository';
import { GoogleStrategy } from './auth/strategy/google.stategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { Tourist, TouristSchema } from './tourist/schema/tourist.schema';
import { Agency, AgencySchema } from './agency/schema/agency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tourist.name, schema: TouristSchema },
      { name: Agency.name, schema: AgencySchema },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PassportModule.register({ session: true }),
    AgencyModule,
    BannerModule,
    SellerModule,
    TripModule,
    RoleModule,
    AdminModule,
    InvitationModule,
    ChatModule,
    TouristModule,
    ClaimModule,
    ResponsibleModule,
    AuthTouristModule,
    RepositoryModule,
  ],

  controllers: [AppController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    GoogleAuthService,
    TouristService,
    AgencyService,
    TouristRepository,
    AgencyRepository,
    JwtService,
  ],
})
export class AppModule {}
