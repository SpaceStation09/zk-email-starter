pragma circom  2.1.5;

include "./twitter_regex.circom";
include "circomlib/circuits/comparators.circom";

template Twitter(msg_bytes){
  signal input msg[msg_bytes];
  signal output out;

  signal (twitter_regex_out, twitter_regex_reveal[msg_bytes]) <== TwitterResetRegex(msg_bytes)(msg);

  signal is_found_twitter <== IsZero()(twitter_regex_out);
  is_found_twitter === 0;

  out <== is_found_twitter;
}

component main = Twitter(1536);