import { app, isRunning } from './app';

app.listen(3333, () => console.log(isRunning));