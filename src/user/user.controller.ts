import { Controller, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Patch } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/current-user.decorators';
import { ChangePasswordDto } from './dtos/change-password.dto';


@Controller('user')
export class UserController {
    constructor( private userService: UserService,){

    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('reset-password')
    async resetPassword(@CurrentUser() user: any, @Body() dto: ChangePasswordDto){

        console.log('---------', user)

         await this.userService.changePassword(user.id, dto);

        return { success: true, message: 'Password changed' };

        

    }
}
