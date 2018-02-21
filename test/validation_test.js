const assert = require('assert')
const User = require('../src/user')
 
describe('Validating records', () => {
  it('require a user name', function () {
      const user = new User({ name: undefined})
      const validationResult = user.validateSync()
      const {message} = validationResult.errors.name
      assert(message === 'Name is required.')
  });
  it('requires a user\'s name longer than 2 char', function () {
    const user = new User({ name: 'AL'})
    const validationResult = user.validateSync()
    const {message} = validationResult.errors.name
    assert(message === 'Name must be longer than 2 characters.')
});
it('disallows invalid records from being saved', function (done) {
    const user = new User({ name: "AL"})
    user.save()
        .catch(validationResult => {
            const {message} = validationResult.errors.name
            assert( message === 'Name must be longer than 2 characters.' )
            done()
        })
});
})
