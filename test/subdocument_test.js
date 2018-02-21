const assert = require("assert");
const User = require("../src/user");

describe("Subdocument", () => {
  it("can create a subdocument", function(done) {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle" }] });
    joe
      .save()
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then(user => {
        assert(user.posts[0].title === "PostTitle");
        done();
      });
  });

  it("add post", function(done) {
    const joe = new User({ name: "Joe", posts: [] });
    joe
      .save()
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then(user => {
        user.posts.push({ title: "New Post" });
        return user.save();
      })
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then(user => {
        assert(user.posts[0].title === "New Post");
        done();
      });
  });

  it("can remove an exisitng subdocument", function(done) {
    const joe = new User({ name: "Joe", posts: [{ title: "New Title" }] });
    joe
      .save()
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
