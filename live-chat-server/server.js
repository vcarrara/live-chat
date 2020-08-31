const Avatar = require('./models/Avatar')

const app = require('express')(),
    server = require('http').createServer(app),
    cors = require('cors'),
    mongoose = require('mongoose'),
    // session = require('express-session'),
    // MongoStore = require('connect-mongo')(session),
    // bcrypt = require('bcrypt'),
    // User = require('./models/User')
    routes = require('./routes'),
    config = require('./config.json'),
    Conversation = require('./models/Conversation'),
    socket = require('socket.io'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken')

const mongoURI = 'mongodb://localhost:27017/live-chat'

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`[live-chat] Successfully connected to MongoDB - ${mongoURI}`)
    })
    .catch((err) => {
        console.log(`[live-chat] Error - ${err}`)
    })

// app.use(
//     session({
//         secret: 'all your base are belong to us',
//         resave: false,
//         saveUninitialized: true,
//         cookie: {
//             maxAge: 10000
//         },
//         store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     })
// )

// const db = mongoose.connection
// db.on('open', () => {
// console.log(`[live-chat] Successfully connected to MongoDB - ${mongoURI}`)
// mongoose.connection.db.listCollections().toArray(function (err, names) {
//     console.log(names); // [{ name: 'dbname.myCollection' }]
// });
// const user = new User()
// user.username = 'john_doe'
// user.password = user.generateHash('azerty')
// user.firstName = 'John'
// user.lastName = 'Doe'
// user.save((err, user) => {
//     if (err) {
//         console.log('Erreur - ', err)
//         return
//     }
//     console.log('Success - ', user)
// })
// User.find({}, (err, users) => {
//     if (err) {
//         console.log('error')
//         console.log(err)
//         return
//     }
//     // const user = users[0]
//     users.forEach((user) => {
//         console.log(user)
//         console.log(user.isPasswordValid('azerty', user.password))
//     })
// })
// })

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))
app.use(bodyParser.json())

const io = socket.listen(server)

// io.of(/^\/\w+$/)
//     .use((socket, next) => {
//         if (socket.handshake.query && socket.handshake.query.token) {
//             jwt.verify(socket.handshake.query.token, config.tokenSecret, (err, user) => {
//                 if (err) {
//                     return next(new Error('Authentication error'))
//                 }
//                 socket.user = user
//                 next()
//             })
//         } else {
//             return next(new Error('Authentication error'))
//         }
//     })
//     .on('connection', (socket) => {
//         const { nsp } = socket
//         console.log(`[live-chat] Someone has been connected to namespace "${nsp.name}"`)
//     })

io.of('/conversation')
    .use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, config.tokenSecret, (err, user) => {
                if (err) {
                    return next(new Error('Authentication error'))
                }
                socket.user = user
                next()
            })
        } else {
            return next(new Error('Authentication error'))
        }
    })
    .on('connection', (socket) => {
        console.log('[live-chat] Someone has been connected to namespace "/conversation"')

        Conversation.findByUserId(socket.user.userId).exec((err, conversations) => {
            if (err) {
                return
            }

            for (let conversation of conversations) {
                console.log(`[live-chat] User ${socket.user.username} joined room ${conversation.room}`)
                socket.join(conversation.room)
            }
        })

        socket.on('send-message', (room, message) => {
            console.log(`[live-chat] Received ${message} in room ${room} by user ${socket.user.username}`)

            Conversation.findOneAndUpdate({ room }, { $push: { messages: { user: socket.user.userId, text: message } } }, { new: true })
                .populate({ path: 'messages.user' })
                .exec((err, conv) => {
                    if (err) {
                        return
                    }
                    // console.log(conv.messages)
                    const lastMessage = conv.messages.slice(-1).pop()
                    console.log(lastMessage)
                    io.of('/conversation').to(room).emit('new-message', room, lastMessage)
                })
        })
    })

// io.of('/conversation')
//     .use((socket, next) => {
//         if (socket.handshake.query && socket.handshake.query.token) {
//             jwt.verify(socket.handshake.query.token, config.tokenSecret, (err, user) => {
//                 if (err) {
//                     return next(new Error('Authentication error'))
//                 }
//                 socket.user = user
//                 next()
//             })
//         } else {
//             return next(new Error('Authentication error'))
//         }
//     })
//     .on('connection', (socket) => {
//         console.log('[live-chat] Someone has been connected to namespace "/conversation"')
//         socket.on('join_room', (room) => {
//             socket.join(room)
//             console.log(`[live-chat] Someone joined the room ${room}`)
//         })

//         socket.on('send_message', (room, message) => {
//             console.log(`[live-chat] Received ${message} in room ${room} by user ${socket.user.username}`)

//             Conversation.findOneAndUpdate({ room }, { $push: { messages: { user: socket.user.userId, text: message } } }, { new: true })
//                 .populate({ path: 'messages.user', select: 'username -_id' })
//                 .exec((err, conv) => {
//                     if (err) {
//                         return
//                     }
//                     console.log(conv.messages)
//                     const lastMessage = conv.messages.slice(-1).pop()
//                     console.log(lastMessage)
//                     io.of('/conversation').to(room).emit('new_message', lastMessage)
//                 })

// Conversation.updateOne({ room: room }, { $push: { messages: { user: socket.user.userId, text: message } } }, (err, conv) => {
//     if (err) {
//         return
//     }
//     console.log(conv)
//     io.in(room).emit('new_message', { sender: socket.user.username,  })
//     // io.in(room).emit('new_message', )
// })
//     })
// })

app.post('/api/account/register', routes.account.register)
app.post('/api/account/login', routes.account.login)
app.get('/api/account/conversations', routes.account.conversations)
app.get('/api/account', routes.account.get)
app.get('/api/conversation/:room', routes.conversation.accessRoom)
app.post('/api/conversation/:room', routes.conversation.createRoom)
app.delete('/api/conversation/:room', routes.conversation.deleteRoom)
app.get('/api/user/:user', () => {})
app.get('/avatars/:avatar', (req, res) => {
    Avatar.findOne({ name: req.params.avatar }, (err, avatar) => {
        if (err) {
            return res.sendStatus(404)
        }
        const { name, extension } = avatar
        res.sendFile(`${__dirname}/avatars/${name}.${extension}`)
    })
})
app.get('/api/check/unique-username/:username', routes.check.uniqueUsername)
app.get('/api/check/room-available/:room', routes.check.roomAvailable)

server.listen(config.port, () => {
    console.log(`[live-chat] HTTP started on port ${config.port}`)
})
