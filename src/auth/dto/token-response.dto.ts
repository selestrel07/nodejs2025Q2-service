import { User } from "src/user/dto/user.dto";

export class TokenResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
