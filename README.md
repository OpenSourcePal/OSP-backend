# OSP-backend
Backend for Open Source Pal

# To access with a key
change this to be a random string(USE THIS IN THE FRONTEND) instead of an array:
https://github.com/OpenSourcePal/OSP-backend/blob/9f4612fd7448c4a3e60be1a67da915d555729eea/src/controllers/key.ts#L7
instead of this, change it to be isAKey = encryptedKey === key:
https://github.com/OpenSourcePal/OSP-backend/blob/9f4612fd7448c4a3e60be1a67da915d555729eea/src/controllers/key.ts#L128-L134
