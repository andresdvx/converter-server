import { Get, ZenController } from "x-zen";
import { UsersService } from "./users.service";

@ZenController("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get({path: 'list'})
  async getUsers() {
    return this.usersService.getUsers();
  }
}
