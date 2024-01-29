import express from 'express'
import stateRoute from './state.route'

const router = express.Router()

const routes = [
    {
        path: '/state',
        route: stateRoute
    }
]

routes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router
