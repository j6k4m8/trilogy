Template.main.rendered = function() {
    $('.page.card').removeClass('faded');
};

refreshStatements = function() {
    Meteor.call('getStatementsForUserAndDate',
            Meteor.userId(),
            moment().toDate(),
            function(err, val) {
        if (!!err) { bootbox.alert(err); }
        else {
            Session.set('statements', val)
        }
    });
};

Template.showTodayForUser.created = function() {
    refreshStatements();
};

Template.showTodayForUser.helpers({
    'statements': function() {
        return _(Session.get('statements')).filter(function(i) {
            return i.date > moment().startOf('day');
        });
    }
});

Template.showTodayForUser.events = {
    'keyup .new-statement': function(ev) {
        if (ev.keyCode == 13 && !!ev.target.value) {
            Meteor.call('insertStatement',
                    new Statement(
                        Meteor.userId(),
                        ev.target.value),
                    function(err, val) {
                        if (!err) {
                            ev.target.value = "";
                            refreshStatements();
                        }
                    });
        }
    },

    'submit .new-statement': function(ev) {
        if (!!ev.target.value) {
            Meteor.call('insertStatement',
                    new Statement(
                        Meteor.userId(),
                        ev.target.value),
                    function(err, val) {
                        if (!err) {
                            ev.target.value = "";
                            refreshStatements();
                        }
                    });
        }
    }
};

Template.showStatement.helpers({
    'date': function() {
        return moment(this.date).calendar();
    }
});


Template.showLastYearForUser.helpers({
    'statements': function() {
        return _(Session.get('statements')).filter(function(i) {
            return i.date < moment().subtract(1, 'y').endOf('day') &&
                   i.date > moment().subtract(1, 'y').startOf('day');
        });
    }
});
