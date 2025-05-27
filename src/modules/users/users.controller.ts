import { Get, RestMethod, ZenController } from "x-zen";
import { UsersService } from "./users.service";

@ZenController("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("list")
  @RestMethod({ statusCode: 200, message: "Users retrieved successfully" })
  async getUsers() {
    return this.usersService.getUsers();
  }
}
