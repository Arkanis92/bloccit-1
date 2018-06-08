const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("POST", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the star system."
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "Johnny Cash, The Legend",
                    body: "His best song is 'Ain't No Grave'",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#create()", () => {
        it("should create a topic object with a title and description", (done) => {

            Topic.create({
                title: "Favorite musicians of all time",
                description: "Where we appreciate and discuss our favorite musicians",
            })
            .then((topic) => {
                expect(topic.title).toBe("Favorite musicians of all time");
                expect(topic.description).toBe("Where we appreciate and discuss our favorite musicians");
                done();
            });
        });
        it("should not create a topic with missing title or description", (done) => {
            Topic.create({
                title: "Favorite musicians of all time",
                description: "Where we appreciate and discuss our favorite musicians",

            })
            .then((topic) => {

                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Topic.title cannot be null");
                expect(err.message).toContain("Topic.description cannot be null");
                done();
            })
        });
    });
    
    describe("#getPosts()", () => {
        it("should return the associated posts", (done) => {

            this.topic.getPosts()
            .then((posts) => {
                expect(posts[0].title).toBe("Johnny Cash, The Legend");
                done();
            });
        });
    });
});