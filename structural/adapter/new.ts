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
        return '<xml>...response...</xml>';
    }
}

class NewService {
    public send(dataJSON: string) {
        console.log('Request from NewService');
        return '{...response...}';
    }
}

class ServiceAdapter extends LegacyService {
    private adaptee: NewService;

    constructor(newService: NewService) {
        super();
        this.adaptee = newService;
    }

    private xmlToJSON(xml: string) {
        // convert xml to json
        return '{... JSON converted from XML ...}';
    }

    private jsonToXML(json: string) {
        // convert json to xml
        return '<xml>... XML converted from JSON ...</xml>';
    }

    public request(dataXML: string): string {
        const dataJSON = this.xmlToJSON(dataXML);
        const responseJSON = this.adaptee.send(dataJSON);
        const responseXML = this.jsonToXML(responseJSON);

        return responseXML;
    }
}

function run() {
    const app = new Application();
    const newService = new NewService();
    const serviceAdapter = new ServiceAdapter(newService);
    const dataXML = '<xml>...</xml>';

    app.doSomething(serviceAdapter, dataXML);
}

run();

// Output:
// Request from NewService
// Process XML <xml>... XML converted from JSON ...</xml>
