import { UserModel } from "@modules/user/user.model";
import { AuthDTO } from "./dtos/auth.dtos";
import { getUserByEmail } from "@modules/user/user.service";

export const validateAuth = async (AuthDTO: AuthDTO): Promise<UserModel> => {
    const user = getUserByEmail(AuthDTO.email)

    return user
}