Meteor.methods({
    'insertStatement': function(statement) {
        return insertStatement(statement);
    },

    'getStatementsForUserAndDate': function(u, d) {
        var s = Statements.find({
            authorId: u,
            //date:     {
            //            $gt: moment(d).startOf('day'),
            //            $lt: moment(d).endOf('day')
            //          }
        }).fetch();

        return s;
    }
});
