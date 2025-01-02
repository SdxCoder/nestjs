import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [AuthModule, UserModule, NotesModule],
})
export class AppModule { }
