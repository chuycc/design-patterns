class Application {
    protected notifier: Notifier;

    public setNotifier(notifier: Notifier) {
        this.notifier = notifier;
    }

    public doSomething() {
        this.notifier.send();
    }
}

class Notifier {
    public send() {
        console.log('Email sent');
    }
}

function run() {
    const app = new Application();
    const notifier = new Notifier();
    app.setNotifier(notifier);
    app.doSomething();
}

run();

// Output:
// Email sent
