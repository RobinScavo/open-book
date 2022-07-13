import { rest } from 'msw';
import { mockUser, mockDeck, secondMockDeck, thirdMockDeck} from '../../tools/utils';

export const handlers = [
    rest.get('http://localhost:8080/decks/', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([ mockDeck, secondMockDeck, thirdMockDeck ])
        )
    }),

    rest.post('http://localhost:8080/users/login', (req, res, ctx) => {
        return res(
            ctx.status(200),
            // ctx.json({
            //     _id: "62a34c61e825cd5a558ea303",
            //     name: "first",
            //     token: "$2a$10$GA1eTVhtKTiy/B0aBlff4O/6nKWqD697aQ9LuGFRfVB1Oz1pJXfMK"
            // })
        )
    })
]
