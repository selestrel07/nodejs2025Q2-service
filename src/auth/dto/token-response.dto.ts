import { User } from "src/user/dto/user.dto";
import { Token } from "./token.dto";

export class TokenResponse {
  user: User;
  tokens: {
    access: Token,
    refresh: Token,
  }
}
