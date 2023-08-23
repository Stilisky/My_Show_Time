/* eslint-disable prettier/prettier */
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        AdminController,],
    providers: [
        AdminService,],
})
export class AdminModule { }
