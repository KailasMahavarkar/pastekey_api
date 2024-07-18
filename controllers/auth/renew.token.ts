import userModel from "@/models/user.model";
import { generateAccessToken } from "@/utils/auth";
import { isEmpty } from "@/helper";
import { verify } from "jsonwebtoken";
import env from "@/env";

// Renew AccessToken
const renewToken = async (req, res) => {
	const currentRefreshToken = req.body.token || req.body.refreshToken;

	// is refresh token valid type?
	if (
		isEmpty(currentRefreshToken) ||
		typeof currentRefreshToken !== "string"
	) {
		return res.status(400).json({
			msg: "token invalid or expired",
			status: "failed",
			code: "01",
		});
	}

	// check if refresh token in the db or not
	const tokenData = await userModel.findOne({
		token: currentRefreshToken,
	});
	if (isEmpty(tokenData)) {
		return res.status(400).json({
			msg: "token invalid or expired",
			status: "failed",
			code: "02",
		});
	}

	// Renew AccessToken if current refresh token is valid
	try {
		const payload = verify(currentRefreshToken, env.REFRESH_TOKEN_SECRET);
		delete payload["iat"];
		delete payload["exp"];
		const newAccessToken = generateAccessToken(payload);
		return res.status(200).json({
			msg: "Token Refresh successful",
			data: {
				accessToken: newAccessToken,
			},
			status: "success",
		});
	} catch (error) {
		// console.log(error);
		return res.status(500).json({
			msg: "token invalid or expired",
			status: "exited",
		});
	}
};

export default renewToken;
