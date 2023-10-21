import { Injectable } from '@nestjs/common';
import { UpdateHotelInput } from 'src/hotel/dtos/update-hotel.dto';
import { UpdateRoomInput } from 'src/hotel/dtos/update-room.dto';

@Injectable()
export class CommonService {
  constructor() {}

  omitUndefined(obj: UpdateRoomInput | UpdateHotelInput): any {
    return Object.fromEntries(
      Object.entries(obj).filter(([, value]) => value !== undefined),
    );
  }
}
