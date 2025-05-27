import { ZenModule } from "x-zen";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@ZenModule({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
