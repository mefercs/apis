//We run this file using `$mocha`
// in the terminal, in the root,
// or with `$npm test` if we defined in
// the package.json
var assert = require('assert')


describe("Arrays", function(){
  describe("+ indexOf", function(){
    it('Should return -1', function(){
      assert.equal([1,2,3].indexOf(5),-1)
    })
    it('Should Contain the index 2', function(){
      assert.equal([1,2].indexOf(3),2)
    })
  })
})
