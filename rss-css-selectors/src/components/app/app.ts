import Controller from '../controller/controller';

class App {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  public start(): void {
    this.controller.start();
  }
}

export default App;
