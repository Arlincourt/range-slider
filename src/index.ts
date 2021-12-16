function importAll(resolve: any) {
  resolve.keys().forEach((str: string) => {
    if (str.includes('.test.ts')) {
      return;
    }
    resolve(str);
  });
}

importAll(require.context('../src/', true, /\.js$|\.scss$|\.css$|\.svg$|\.png$|\.jpg$|\.ts$/));
