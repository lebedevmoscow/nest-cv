import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDTO} from "./dtos/create-user.dto";
import {UsersService} from "./users.service";

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('signup')
    public createUser(@Body() body: CreateUserDTO) {
        return this.userService.create(body.email, body.password)
    }

}
