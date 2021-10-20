interface Message {
    id: string;
    text: string;
    user: {
        avatar_url: string;
        name: string;
    }
}