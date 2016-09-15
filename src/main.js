import {readFileSync} from 'fs';
import {createInterface} from 'readline';
import Recitus from 'recitus-core';

const usage =
`Usage: $0 [options]

Options:
-v, --vocabPath=<path>: path to the vocabulary file
-b, --bankPath=<path>: path to the bank file
-d, --delta=<number>: new words to learn today
-c, --config=<path>: the overall json config file
`;

function check(argv) {
  if (argv.c) {
    return true;
  } else if (argv.v && argv.b && argv.d) {
    return true;
  }
  return false;
}

check.toString = function () {
  return 'vocabPath, bankPath & delta are required, or a config file is provided.';
};

const argv = require('optimist')
            .usage(usage)
            .check(check)
            .alias('v', 'vocabPath')
            .alias('b', 'bankPath')
            .alias('d', 'delta')
            .alias('c', 'config')
            .argv;

const rl = createInterface({input: process.stdin, output: process.stdout});

if (argv.c) {
  var config = JSON.parse(readFileSync(argv.c));
  argv.v = config.vocabPath;
  argv.b = config.bankPath;
  argv.d = config.delta;
}

const recitus = new Recitus(argv.v, argv.b);
recitus.start(argv.d);

var word;

function answer(q) {
  q = parseInt(q, 10);
  if (q >= 0 && q < 6) {
    recitus.update(q);
    open();
  } else {
    rl.question('Invalid answer, please answer in 0-5.\n', answer);
  }
}

function open() {
  if (recitus.empty()) {
    rl.write('end');
    recitus.stop();
    rl.close();
  } else {
    word = recitus.pick();
    rl.question(word.q, () => {
      rl.question(word.a + '\n', answer);
    });
  }
}

open();
