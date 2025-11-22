import { Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, RolesGuard } from '../auth/auth.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from './enums/role.enum';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.MANAGER)
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    getUsers() {
        return this.userService.getUsers();
    }

    @Roles(Role.MANAGER)
    @Get(':role')
    @ApiOperation({ summary: 'Get users by role' })
    findOne(@Param('role') role: string) {
        return this.userService.findByRole(role);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    @HttpCode(204)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.remove(id);
    }
}
