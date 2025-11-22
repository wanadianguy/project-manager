import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, RolesGuard } from '../auth/auth.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from '../user/enums/role.enum';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('tasks')
export class TaskController {
    constructor(private readonly tasksService: TaskService) {}

    @Roles(Role.MANAGER)
    @Post()
    @ApiOperation({ summary: 'Create a task' })
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a task by id' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.findOne(id);
    }

    @Get('phase/:phaseId')
    @ApiOperation({ summary: 'Get tasks by phase id' })
    findByPhase(@Param('phaseId', ParseUUIDPipe) phaseId: string) {
        return this.tasksService.findByPhase(phaseId);
    }

    @Roles(Role.MANAGER)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a task' })
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Roles(Role.MANAGER)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task' })
    @HttpCode(204)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.remove(id);
    }
}
