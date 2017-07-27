# Acrobot

@TODO: Consider changing name to `Lingo` or `lingo-bot`;

A slack chatbot for acronym lookups.

### About

Great for helping n00bs or maybe your org has _lots_ of acronyms.

### Features

#### Search is Fuzzy

#### Collisions are _OK_

#### export URL

#### import command

#### CRUD interface in slack [?]

### Slack Commands

This app uses slash commands. After adding to your team, simply type one of the below `/slash` command signatures into chat:

#### Search acronym (Fuzzy)

case insensitve, off by a char or two is OK, 

```
/define RTR
```

returns:

> **RTR**: Roll Tide Roll

#### Add (or Update existing) Acronym

```
/define abc Alabama Beverage Control
```

#### Remove Acronym 

```
/define remove abc
```

returns:

> Removed `ABC => Alabama Beverage Control`

#### Export Dictionary

#### Import (replace)

```
/define import <pathToCSV>
```

or 

```
/define import <pathToCSV> append
```

### Design Notes

Note: how to tackel storage?

BotKit offers some storage mechanisms.... but heroku does not allow node apps access to the filesystem. There's always something else.... but do NOT make managing consistency b/n the master on github and noSQL or in-memmory options
