import app from './app'
import bluebird from 'bluebird'
import mongoose from 'mongoose'

mongoose.Promise = bluebird

mongoose.connect("mongodb://storage:27017/monumental", {}).then(() => {

        // Start Express server
        const server = app.listen(3000, () => {

            console.log("  App is running at http://localhost:%d", 3000)
            console.log("  Press CTRL-C to stop\n")
        })

        // setup websockets channel
        // Websockets(server)

    }
).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`)
    process.exit(1)
});



