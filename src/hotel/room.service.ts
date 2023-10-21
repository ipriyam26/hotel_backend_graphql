import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { CreateRoomInputDto } from './dtos/create-room.dto';
import { UpdateRoomInput } from './dtos/update-room.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private commonService: CommonService,
  ) {}

  async create(createRoomInput: CreateRoomInputDto): Promise<Room> {
    const room = this.roomRepository.create(createRoomInput);
    return await this.roomRepository.save(room);
  }

  async createMany(createRoomsInput: CreateRoomInputDto[]): Promise<Room[]> {
    const rooms = [];
    for (const room of createRoomsInput) {
      rooms.push(this.roomRepository.create(room));
    }
    return await this.roomRepository.save(rooms);
  }
  async update(updateRoomInput: UpdateRoomInput): Promise<Room> | undefined {
    let room = await this.findOne(updateRoomInput.id);
    if (!room) {
      throw new NotFoundException(`Room #${updateRoomInput.id} not found`);
    }

    room = { ...room, ...this.commonService.omitUndefined(updateRoomInput) };
    return await this.roomRepository.save(room);
  }
  async findOne(id: number): Promise<Room> {
    return await this.roomRepository.findOne({
      where: [{ id }],
    });
  }
}
