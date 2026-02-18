/**
 * Encrypts a string using RSA-OAEP with SHA-256
 * @param {string} plainText - The text to encrypt (e.g., password)
 * @param {string} publicKeyPem - The RSA public key in PEM format
 * @returns {Promise<string>} - The Base64 encoded encrypted string
 */
export async function encryptWithRSA(plainText, publicKeyPem) {
  try {
    // 1. Clean the PEM string to get the base64 content
    const pemContents = publicKeyPem
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '')
      .replace(/\s+/g, '');
    
    // 2. Convert base64 string to a byte array
    const binaryDer = window.atob(pemContents);
    const binaryDerArr = new Uint8Array(binaryDer.length);
    for (let i = 0; i < binaryDer.length; i++) {
        binaryDerArr[i] = binaryDer.charCodeAt(i);
    }

    // 3. Import the public key
    const publicKey = await window.crypto.subtle.importKey(
      "spki",
      binaryDerArr.buffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["encrypt"]
    );

    // 4. Encrypt the data
    const encoder = new TextEncoder();
    const data = encoder.encode(plainText);
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      data
    );

    // 5. Convert to base64 for transport
    return window.btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  } catch (error) {
    console.error("RSA Encryption Error:", error);
    throw new Error("Failed to secure credentials");
  }
}
