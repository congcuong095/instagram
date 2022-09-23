import images from '@/assets/images';

//Fake recent account login

export const APIaccounts = [];

let State = '';

if (APIaccounts.length == 0) {
    State = 'newAccount';
} else if (APIaccounts.length == 1) {
    State = 'oneOldAccount';
} else if (APIaccounts.length > 1) {
    State = 'oldAccount';
}

export { State };

//Fake recent search

export const recentSearchApi = [
    {
        id: 1,
        username: 'hoaminzy_rose',
        full_name: 'Hòa Minzy 1',
        img_src:
            '/v/t51.2885-19/296847109_739547083927920_2093358076121852250_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fhan14-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ohM4EB3jNboAX-WXxZx&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AT8SqgwfAxm279UkiURSGKaMIqSKmCGawc3TGKtEQDh8vw&oe=63239AE2&_nc_sid=5cbaad',
        is_verified: true,
    },
    {
        id: 2,
        username: 'hoaminzy_rose',
        full_name: 'Hòa Minzy 2',
        img_src:
            '/v/t51.2885-19/296847109_739547083927920_2093358076121852250_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fhan14-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ohM4EB3jNboAX-WXxZx&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AT8SqgwfAxm279UkiURSGKaMIqSKmCGawc3TGKtEQDh8vw&oe=63239AE2&_nc_sid=5cbaad',
        is_verified: true,
    },
    {
        id: 3,
        username: 'hoaminzy_rose',
        full_name: 'Hòa Minzy 3',
        img_src:
            '/v/t51.2885-19/296847109_739547083927920_2093358076121852250_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fhan14-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ohM4EB3jNboAX-WXxZx&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AT8SqgwfAxm279UkiURSGKaMIqSKmCGawc3TGKtEQDh8vw&oe=63239AE2&_nc_sid=5cbaad',
        is_verified: true,
    },
];
