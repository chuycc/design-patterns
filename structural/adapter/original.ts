class Application {
    private process(xml: string) {
        console.log('Process XML', xml);
    }

    public doSomething(legacyService: LegacyService, dataXML: string) {
        const response = legacyService.request(dataXML);
        this.process(response);
    }
}

class LegacyService {
    public request(dataXML: string) {
        console.log('Request from LegacyService');
        return '<xml>... response ...</xml>';
    }
}

function run() {
    const app = new Application();
    const legacyService = new LegacyService();
    const dataXML = '<xml>... data ...</xml>';

    app.doSomething(legacyService, dataXML);
}

run();

// Output:
// Request from LegacyService
// Process XML <xml>... response ...</xml>
