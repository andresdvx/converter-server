import { UsersModule } from "../users/users.module";
import { ConverterController } from "./converter.controller";
import { ConverterService } from "./converter.service";
import { ZenModule, ZenProvider } from "x-zen";

@ZenProvider()
export class Xd{

}

@ZenModule({
  controllers: [ConverterController],
  providers: [ConverterService],
  imports: [UsersModule]
})
export class ConverterModule { }

