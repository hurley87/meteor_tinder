Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let handle = Meteor.subscribe("myData")
    let data = MyData.find().fetch()
    return {
      loading: !handle.ready(),
      users: data
    }
  },
  setAffirmative(_id) {
    MyData.update({_id}, {$set: { affirmative: true}})
  },
  renderCards() {
    return this.data.users
    .filter((user) =>  user.affirmative != true)
    .map((card) => {
      return <Card
        key={card._id}
        card={card}
        setAffirmative={ () => this.setAffirmative(card._id)}
      />
    })
  },
  render() {
    if (this.data.loading) {
      return <h1>Loading</h1>
    }
    return <div>{this.renderCards()}</div>
  }
})