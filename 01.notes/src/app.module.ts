import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from './database/database.module';
import { config } from 'dotenv';

@Module({
  imports: [AuthModule, UserModule, NotesModule, DatabaseModule],
})
export class AppModule {
  constructor() {
    config();
  }
}
