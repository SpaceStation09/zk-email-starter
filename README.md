# zk-email-starter (WIP)

This is a starter project to implement proof of twitter with zk-email. This project is still under WIP.

## Usage

### Prerequisite

Make sure you have `snarkjs`, `rust` and `circom` installed.

### Install

Clone the repo and install all dependencies.

```
  yarn
```

### zk-regex

Use [zk-regex](https://github.com/zkemail/zk-regex) to help generate [twitter_regex.circom](circuits/twitter_regex.circom). Please check the usage of zk-regex at its [readme.md](https://github.com/zkemail/zk-regex/tree/main?tab=readme-ov-file#how-to-use).

### ptau

Due to the high amount of constraints in our generated circuits, you'd better use pot22 rather than 14 (used in snarkjs guide).
Get the ptau file at <https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_22.ptau>.

**Note**:
If you want to get the other ptau files with different pot, check the table in [guide of snarkjs](https://github.com/iden3/snarkjs?tab=readme-ov-file#guide).

### compile

Use circom to compile the circuit

```
  circom -l node_modules circuits/twitter_regex.circom -o ./build --r1cs --wasm --sym --c
```

- `-l`: specify the directory where the directive `include` should look for the circuits indicated.

- `circuits/twitter_regex.circom`: circom location.
- `-o`: output path.

**Fast path**:

```
  yarn run compile
```

### input

You need the original email to generate the input file. please put the file at `script/emls/twitter.eml`. Then run:

```
  yarn run input
```

### witness

Generate the input:

```
  yarn run witness
```

If you meet error here, check if all the file specified in the command `witness` (in package.json) is generated.

## Acknowledgement

- [snarkjs](https://github.com/iden3/snarkjs)
- [zk-email](https://zkemail.gitbook.io/zk-email/zk-email-verifier)
- [zk-regex](https://github.com/zkemail/zk-regex)
