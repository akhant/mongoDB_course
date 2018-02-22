const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  const assertName = (operation, done) => {
    operation
      .then(() => {
        return User.find({});
      })
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  };

  beforeEach(done => {
    joe = new User({ name: "Joe", likes: 0 });
    joe.save().then(() => {
      done();
    });
  });

  it("instance type use set n save", done => {
    joe.set("name", "Alex");
    assertName(joe.save(), done);
  });
  it("instance can update", function(done) {
    assertName(joe.update({ name: "Alex" }), done);
  });

  it("A model class can update", function(done) {
    assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("A model class can update one record", function(done) {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("A model class can update with id", function(done) {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });
  it("increment postCount by 1", function(done) {
    User.update({ name: "Joe" }, { $inc: { likes: 1 } })
    .then(() => {
      return User.findOne({ name: "Joe" });
    }).then(user => {
      assert(user.likes === 1);
      done();
    });
  });
});
