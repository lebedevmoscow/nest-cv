import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {CreateUserDTO} from "./dtos/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dtos/update-user.dto";

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('signup')
    public createUser(@Body() body: CreateUserDTO) {
        return this.userService.create(body.email, body.password)
    }

    @Get('/:id')
    public findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id))
    }

    @Get()
    public findAllUser(@Query('email') email: string) {
        return this.userService.find(email)
    }

    @Delete('/:id')
    public removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    public updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body)
    }
}
