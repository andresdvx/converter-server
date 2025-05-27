import { UsersModule } from "../users/users.module";
import { ConverterController } from "./converter.controller";
import { ConverterService } from "./converter.service";
import { ZenModule } from "x-zen";

@ZenModule({
  controllers: [ConverterController],
  providers: [ConverterService],
  imports: [UsersModule]
})
export class ConverterModule {}
