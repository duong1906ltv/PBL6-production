import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import gravatar from "gravatar";
import normalize from "normalize-url";
import Profile from "../models/Profile.js";

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new BadRequestError("Please provide all values");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError("Email already in use");
    }

    const avatar = normalize(
        gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
        }),
        { forceHttps: true }
    );

    const user = await User.create({ username, email, password, avatar });
    await Profile.create({ user: user._id });
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: {
            email: user.email,
            username: user.username,
            avatar: user.avatar,
        },
        token,
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token });
};

export { register, login };
