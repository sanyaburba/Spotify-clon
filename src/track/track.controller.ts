  import { Body, Controller, Get, Post } from "@nestjs/common";
  import { TrackService } from "./track.service";
  import { CreateTrackDto } from "./dto/create-track.dto";

@Controller('/tracks')
export class TrackController {

  constructor(private trackService:TrackService) {
  }

@Post()
   create(@Body() dto: CreateTrackDto ) {
    return  this.trackService.create(dto)
  }
   delete() {

  }
  @Get()
   getAll(){
    return 'hello world from nest program'
  }
   getOne(){

  }
}