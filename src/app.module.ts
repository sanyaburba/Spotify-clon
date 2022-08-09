import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://user1:user1@cluster0.l1gjt.mongodb.net/BLOG?retryWrites=true&w=majority'),
    TrackModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
