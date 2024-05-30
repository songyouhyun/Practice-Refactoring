import App from "./controller/App";
import {ConsoleInputView} from "./view/ConsoleInputView";

const app: App = new App(new ConsoleInputView());
app.play();
