let Transition = React.addons.CSSTransitionGroup;

MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      
    }
  },
  getDefaultProps() {
    return {
      tabs: ["Tab 1", "Tab 2", "Tab 3"]
    }
  },
  getInitialState() {
    return {
      modal: false
    }
  },
  ionModal(tab) {
    this.setState({
      modal: (
        <IonModal>
          <div className="h1 title">{tab}</div>
          <button onClick={ () => this.setState({modal:false}) } className="button button-icon active">
            <i className="icon ion-ios-close-empty"></i>
          </button>
        </IonModal>
      )
    })
  },
  render() {
    return (
      <div className="ionic-body">
        <div className="bar bar-header bar-light">
          <a className="button button-icon icon ion-gear-a" href="/settings"></a>
          <a className="h1 title" href="/">App Name</a>
          <a className="button button-icon icon ion-heart" href="/other"></a>
        </div>
        <div className="view">
          <div className="scroll-content ionic-scroll">
            <div className="content overflow-scroll has-header">
              {this.props.content}
            </div>
          </div>
        </div>
        <div className="tabs tabs-icon-top">
          {this.props.tabs.map((tab, i) => {
              return (
                <a className="tab-item" key={tab} onClick={this.ionModal.bind(null, tab)}>
                  <i className="icon ion-star"></i>
                  {tab}
                </a>
              )
            })
          }
        </div>
        {this.state.modal ? <Backdrop /> : false}
        <Transition transitionName="modal">
          {this.state.modal}
        </Transition>
      </div>
    );
  }
});