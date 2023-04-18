import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать как минимум 3 символа').isLength({min:3}),
    body('fullName', 'Имя должно содержать минимум 2 символа').isLength({min:2}),
    body('avatarUrl', 'Ваша ссылка - не ссылка').optional().isURL(),
]