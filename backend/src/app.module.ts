import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './modules/user/user.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { TimeEntryModule } from './modules/time-entry/time-entry.module';
import { TaskModule } from './modules/task/task.module';
import { ProjectModule } from './modules/project/project.module';
import { PhaseModule } from './modules/phase/phase.module';
import { StaffModule } from './modules/staff/staff.module';
import { AssignmentModule } from './modules/assignment/assignment.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '5m' },
        }),
        MikroOrmModule.forRoot(),
        AuthModule,
        UserModule,
        InvoiceModule,
        PhaseModule,
        ProjectModule,
        TaskModule,
        TimeEntryModule,
        StaffModule,
        AssignmentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
