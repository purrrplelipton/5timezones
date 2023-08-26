export default function getRandomInt(min, max) {
  const range = max - min + 1; // Adding 1 to include the max value
  const bitsNeeded = Math.ceil(Math.log2(range));
  const bytesNeeded = Math.ceil(bitsNeeded / 8);
  const maxValue = 256 ** bytesNeeded;
  const randomBytes = new Uint8Array(bytesNeeded);

  // Generate random bytes
  window.crypto.getRandomValues(randomBytes);

  let randomValue = 0;
  for (let i = 0; i < bytesNeeded; i++) {
    randomValue += randomBytes[i] * 256 ** i;
  }

  // Use rejection sampling to ensure the value is within the desired range
  if (randomValue >= maxValue - (maxValue % range)) {
    return getRandomInt(min, max);
  }

  return min + (randomValue % range);
}
