import request from 'supertest'
import connectDb from '../config/mongoDb.js'
import { disconnectDB } from '../config/mongoDb.js'
import app from '../server.js'
import UserSchema from '../models/userSchema.js'

describe("GET /user/getUser/:userId", () => {

    let user

    // Runs ONCE before all tests
    beforeAll(async () => {
        await connectDb()
    });

    // Runs BEFORE EVERY test
    beforeEach(async () => {
        user = await UserSchema.insertOne({
            email: "testuser@gmail.com", 
            password: "testpassword123", 
            isBlocked: false
        })
    });

    // Runs AFTER EVERY test
    afterEach(async () => {
    await UserSchema.deleteMany({
        email: "testuser@gmail.com"
    });
});

    // Runs ONCE after all tests
    afterAll(async () => {
        await disconnectDB()
    });


    test("should return user when user exists", async () => {

        const response = await request(app)
            .get(`/user/getUser/${user._id}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.user.email).toBe("testuser@gmail.com");
    });


});