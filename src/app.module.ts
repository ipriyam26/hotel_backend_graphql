import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HotelModule } from './hotel/hotel.module';
import { BookingModule } from './booking/booking.module';
import { CommonModule } from './common/common.module';
import { BookingService } from './booking/booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Hotel } from './hotel/hotel.entity';
import { Booking } from './booking/booking.entity';
import { Payment } from './booking/payment.entity';
import { Room } from './hotel/room.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.29.207',
      port: 10021,
      username: 'root',
      password: '1234',
      database: 'mydb',
      entities: [User, Hotel, Booking, Payment, Room],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    HotelModule,
    BookingModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, BookingService],
})
export class AppModule {}
