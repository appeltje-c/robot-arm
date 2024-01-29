import express from 'express'
import {stateController} from '../../controllers'

const router = express.Router()

router.route('/')
    .get(stateController.get)

export default router
