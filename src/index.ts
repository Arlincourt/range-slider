import './styles.scss';

function importAll(resolve: (str: string) => void): void {
  Object(resolve).keys().forEach((str: string) => {
    if (str.includes('.test.ts')) {
      return;
    }
    resolve(str);
  });
}

importAll(require.context('../src/', true, /\.js$|\.css$|\.ts$/));