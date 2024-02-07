import { AuthDTO } from "./dtos/auth.dtos";
import { getUserByEmail } from "@modules/user/user.service";
import { validatePassword } from "@utils/password";
import { NotFoundException } from "@exceptions/not-found-exception";
import { AuthModel } from "./auth.model";
import { generateToken } from "@utils/auth";

export const validateAuth = async (authDTO: AuthDTO): Promise<AuthModel> => {
    const user = await getUserByEmail(authDTO.email)

    const isValidPassword = await validatePassword(authDTO.password, user.password)

    if (!isValidPassword) {
        throw new NotFoundException('User')
    }

    return new AuthModel(generateToken(user), user)
}