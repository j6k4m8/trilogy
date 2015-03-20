insertStatement = function(statement) {
    if (!!statement.text &&
            !!statement.authorId &&
            !!statement.date) {
        return Statements.insert(statement);
    }

    throw new Meteor.Error(500, "Invalid entry.");
}
