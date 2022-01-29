import { Request,Response,NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
const useGuard = (guard:any) => {
	return async (req:Request, res:Response, next:NextFunction) => {
		try {
			await guard(req);
			next()
		} catch (e:any) {
			next(
				new HttpException(400, e.message)
			)
		}

	};
};

export default useGuard
