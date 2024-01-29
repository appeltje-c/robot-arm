import {Request, Response} from "express"

/**
 *
 */
export const get = async (req: Request, res: Response) => {

    //const state = await RobotState.find({})

    res.send({state: "coords"})
}
