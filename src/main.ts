import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session = require('express-session');
import passport = require('passport');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000 / 3,
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3001);
}

bootstrap();
