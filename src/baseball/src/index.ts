import App from "./controller/App";
import {ConsoleOutputView} from "./view/ConsoleOutputView";
import {ConsoleInputView} from "./view/ConsoleInputView";

const app: App = new App(new ConsoleInputView(), new ConsoleOutputView());
app.play();
