import { generateCircuitInputs } from "@zk-email/helpers/dist/input-helpers";
import { verifyDKIMSignature } from "@zk-email/helpers/dist/dkim";
import fs from "fs";
import path from "path";

export const STRING_PRESELECTOR = "email was meant for @";
export const MAX_HEADER_PADDED_BYTES = 1024; // NOTE: this must be the same as the first arg in the email in main args circom
export const MAX_BODY_PADDED_BYTES = 1536; // NOTE: this must be the same as the arg to sha the remainder number of bytes in the email in main args circom

async function main() {
  const rawEmail = fs.readFileSync(path.join(__dirname, "./emls/twitter.eml"), "utf8");

  const dkimResult = await verifyDKIMSignature(Buffer.from(rawEmail));

  const circuitInputs = generateCircuitInputs({
    rsaSignature: dkimResult.signature,
    rsaPublicKey: dkimResult.publicKey,
    body: dkimResult.body,
    bodyHash: dkimResult.bodyHash,
    message: dkimResult.message,
    shaPrecomputeSelector: STRING_PRESELECTOR,
    maxMessageLength: MAX_HEADER_PADDED_BYTES,
    maxBodyLength: MAX_BODY_PADDED_BYTES,
  })

  const regexCircuitInput = circuitInputs.in_body_padded!;
  const input = JSON.stringify({
    "msg": regexCircuitInput
  });

  fs.writeFileSync(path.join(__dirname, "../circuits/input/twitter.json"), input);

  console.log(
    "Input written to: ",
    path.join(__dirname, "../circuits/input/twitter.json")
  );
}

main();