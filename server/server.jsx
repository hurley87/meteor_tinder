if (MyData.find().count() === 0) {
  _.each(_.range(25), function(){
    MyData.insert({
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar()
    });
  });
}

if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: "david",
    password: "password",
    profile: {
      image: "http://i.imgur.com/NqyBZSp.gif"
    }
  })
}

Meteor.publish("myData", function() {
  return MyData.find()
})