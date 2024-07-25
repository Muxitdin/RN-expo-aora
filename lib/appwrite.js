import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.nm.aora',
    projectId: '66a0862f00245e195aa6',
    databaseId: '66a08ba4002a195b6693',
    userCollectionId: '66a08bdf00367731ff5e',
    videoCollectionId: '66a08c0e002baac23608',
    storageId: "66a08fd5001ca65284cf",
}

// Init your React Native SDK
const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)



const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, username, password) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        await signIn(email, password);

        const avatarURL = avatars.getInitials(username)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarURL
            }
        );

        return { newAccount, newUser };
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try {
        try {
            const existingSession = await account.getSession('current');
            if (existingSession) {
                await account.deleteSession("current");
            }
        } catch (error) {
            if (error.code !== 404) {
                console.log(error)
            }
        }

        // Create a new session
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )
        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}