const fs = require('fs');
const superagent = require('superagent');

// Callback hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Bread: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body);

//       fs.writeFile('dog-img.txt', res.body.message, err => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file!');
//       });
//     });
// });

// Promises
const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File not found!');
      resolve(data);
    });
  });
};
const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Fail to write file!');
      resolve('success');
    });
  });
};
// readFilePromise(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Bread: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body);
//     return writeFilePromise('dog-img.txt', res.body.message);
//   })
//   .then(() => console.log('Random dog image saved to file!'))
//   .catch(err => console.log(err));

// Async/Await
const getDocPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Bread: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body);
    await writeFilePromise('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    throw err;
  }
};
(async () => {
  try {
    await getDocPic();
  } catch (err) {
    console.log(err);
  }
})();
