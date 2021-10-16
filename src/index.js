function importAll(resolve) {
  resolve.keys().forEach((str) => {
    if (str.includes('.test.ts')) {
      return;
    }
    resolve(str);
  });
}

importAll(require.context('../src/', true, /\.js$|\.scss$|\.css$|\.svg$|\.png$|\.jpg$|\.ts$/));
