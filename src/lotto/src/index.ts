import App from "./controller/App";
import {ConsoleInputView} from "./view/ConsoleInputView";
import {ConsoleOutputView} from "./view/ConsoleOutputView";

const app: App = new App(new ConsoleInputView(), new ConsoleOutputView());
app.play();
