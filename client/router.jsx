FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, {
    	content: <Home />
    });
  }
});

FlowRouter.route('/other', {
  action() {
    ReactLayout.render(MainLayout, {
    	content: <Other />
    });
  }
});

FlowRouter.route('/settings', {
  action() {
    ReactLayout.render(MainLayout, {
    	content: <Settings /> 
    });
  }
});