export default function createProfile(id, name = "Player", startMoney = 100) {
    return {
        money: startMoney,
        combinations: {},
        roundsWinCount: 0,
        name: name,
        id: id,
    };
}
