# Recitus CLI #

A CLI implementation of [recitus](https://github.com/gyf1214/recitus-core).

## Usage ##

    node main [options]

Options:

- -v, --vocabPath=<path>: path to the vocabulary file
- -b, --bankPath=<path>: path to the bank file
- -d, --delta=<number>: new words to learn today
- -c, --config=<path>: the overall json config file

vocabPath, bankPath & delta are required, or a config file is provided.

The overall json config file should provide all three options.

### How to recite ###

When it is started, the program will pick cards repeatedly. For each card, a question will appear on the interface. The user should try to recall the answer and type \<Enter\>. Then the program will give the right answer for the user to check. Type an integer respond in 0-5 to tell the program how much the user have memerized.

After all the cards are checked, 'end' will be printed and the program will be terminated. The reviews are arranged by SuperMemo 2 algorithm automatically.

## Author ##

Tiny

## License ##

MIT
