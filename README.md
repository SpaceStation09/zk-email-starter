# zk-email-starter (WIP)

This is a starter project to implement proof of twitter with zk-email. This repo is still under construction.

## Usage

### Prerequisite

Make sure you have `snarkjs`, `rust` and `circom` installed.

### Install

Clone the repo and install all dependencies.

```
  yarn
```

### circuits

#### zk-regex

Build your twitter email regex circuit:

  Use [zk-regex](https://github.com/zkemail/zk-regex) to help generate [twitter_regex.circom](circuits/twitter_regex.circom). Please check the usage of zk-regex at its [readme.md](https://github.com/zkemail/zk-regex/tree/main?tab=readme-ov-file#how-to-use).

#### email-verifier

Build the main circuit with `email-verifier` and `twitter_regex.circom` (generated in former step).

### ptau

Due to the high amount of constraints in our generated circuits, you'd better use pot22 rather than 14 (used in snarkjs guide).
You could get the ptau file at <https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_22.ptau> or generate it by yourself.

**Note**:
If you want to get the other ptau files with different pot directly, check the table in [guide of snarkjs](https://github.com/iden3/snarkjs?tab=readme-ov-file#guide).

### compile

Use circom to compile your circuit.

```
  circom -l node_modules circuits/twitter.circom -o ./build --r1cs --wasm --sym --c
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

### setup

You can run:
```
  yarn run setup
```

which equals

```
  snarkjs groth16 setup build/twitter.r1cs pot22_final.ptau proof/twitter_0000.zkey
```

This generates the reference `zkey` without phase 2 contributions.

**IMPORTANT**: Do not use this `zkey` in production, as it's not safe. It requires at least a contribution,

In this project, I contributed twice and used a random beacon.

Run `yarn run export-vk` to export the verification key.

### proof

Generate the proof with `twitter_final.zkey` and `twitter.wtns`:

```
 yarn run proof
```

Then, you'll get `proof.json` and `public.json`.

### verify proof

```
  snarkjs groth16 verify proof/verification_key.json proof/public.json proof/proof.json
```

### contract verifier

Turn verifier into a smart contract:

```
  snarkjs zkey export solidityverifier proof/twitter_final.zkey contracts/twitterVerifier.sol
```

Get the simulation verification call to verifier contract:

```
  snarkjs zkey export soliditycalldata proof/public.json proof/proof.json
```

## File Structure

FYI.

```
├── build
│   ├── twitter.r1cs
│   ├── twitter.sym
│   ├── twitter_cpp
│   └── twitter_js
│       ├── generate_witness.js
│       ├── twitter.wasm
│       └── witness_calculator.js
├── circuits
│   ├── input
│   │   └── twitter.json
│   ├── twitter.circom
│   └── twitter_regex.circom
├── contracts
│   └── twitterVerifier.sol
├── pot22_final.ptau
├── proof
│   ├── proof.json
│   ├── public.json
│   ├── twitter.wtns
│   ├── twitter_0000.zkey
│   ├── twitter_0001.zkey
│   ├── twitter_0002.zkey
│   ├── twitter_final.zkey
│   └── verification_key.json
└── scripts
    ├── emls
    │   └── twitter.eml
    └── generate-input.ts
```

## Acknowledgement

- [snarkjs](https://github.com/iden3/snarkjs)
- [zk-email](https://zkemail.gitbook.io/zk-email/zk-email-verifier)
- [zk-regex](https://github.com/zkemail/zk-regex)

