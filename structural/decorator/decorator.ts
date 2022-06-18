/**
 * Original notifier, it sends an email
 */

// class Notifier {
//    public send() {
//        console.log('Email sent');
//    }
// }

class Application {
    protected notifier: Notifier;

    public setNotifier(notifier: Notifier) {
        this.notifier = notifier;
    }

    public doSomething() {
        this.notifier.send();
    }
}

/**
 * Now, we want to add more type of notifiers like Facebook, Slack, SMS
 */

interface NotifierI {
    send() : void;
}

class Notifier implements NotifierI { // Implements added
    public send() {
        // ...
        console.log('Email sent');
    }
}

class NotifierDecorator implements NotifierI {
    protected notifier: NotifierI;

    constructor(notifier: Notifier) {
        this.notifier = notifier;
    }

    public send(): void {
        this.notifier.send();
    }
}

class SMSNotifierDecorator extends NotifierDecorator {
    public send(): void {
        super.send();
        console.log('SMS sent');
    }
}

class SlackNotifierDecorator extends NotifierDecorator {
    public send(): void {
        super.send();
        console.log('Slack message sent');
    }
}

class FacebookNotifierDecorator extends NotifierDecorator {
    public send(): void {
        super.send();
        console.log('Facebook message sent');
    }
}

/**
 * Original code
 */
// const app = new Application();
// const notifier = new Notifier();
// app.setNotifier(notifier);
// app.doSomething();

/**
 * New code
 */
const app = new Application();
const notifier = new Notifier();
const SMSNotifier = new SMSNotifierDecorator(notifier);
const slackNotifier = new SlackNotifierDecorator(SMSNotifier);
const facebookNotifier = new FacebookNotifierDecorator(slackNotifier);
app.setNotifier(facebookNotifier);
app.doSomething();