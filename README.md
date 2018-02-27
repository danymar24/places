# Places

Territory and places app using meteorjs and reactjs

## Configure email

Create a file inside folder server:

email-config.js
```javascript

import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.startup(() => {
        process.env.MAIL_URL = "smtps://USERNAME:PASSWORD@SERVER:PORT"
    })
}

```