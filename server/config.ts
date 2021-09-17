export const corsUrl = process.env.CORS_URL;
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const encryptionKey = process.env.ENCRYPTION_KEY ?? '';

export const firebaseConfig = {
    databaseURL: process.env.DB_URL,
    serviceAccountKey: {
        projectId: process.env.DB_PROJECT_ID,
        privateKey: process.env.DB_PRIVATE_KEY,
        clientEmail: process.env.DB_CLIENT_EMAIL,
    },
};