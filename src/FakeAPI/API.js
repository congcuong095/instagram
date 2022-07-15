import images from '@/assets/images';

const APIaccounts = [
    {
        id: 0,
        name: 'account1',
        img: images.avatar1,
    },
    {
        id: 1,
        name: 'account2',
        img: images.avatar1,
    },
];

let State = '';

if (APIaccounts.length == 0) {
    State = 'newAccount';
} else if (APIaccounts.length == 1) {
    State = 'oneOldAccount';
} else if (APIaccounts.length > 1) {
    State = 'oldAccount';
}

export default APIaccounts;
export { State };
