export class Opponent {
    #id;
    #image;
    #name;
    #money;
    #countRoundToWin;
    #betsDescription;
    #tacticDescription;
    #selectDiceToRerollFunction;
    #initMoney;
    #moneyRecoveryHours;
    #dateToResetMoney;
    #minimalBet;
    constructor({
        id,
        image,
        name,
        initMoney,
        moneyRecoveryTime,
        money,
        countRoundToWin,
        betsDescription,
        tacticDescription,
        selectDiceToRerollFunction,
        minimalBet,
    }) {
        this.#id = id;
        this.#image = image;
        this.#name = name;
        this.#initMoney = initMoney;
        this.#money = money;
        this.#moneyRecoveryHours = moneyRecoveryTime || 24;
        this.#dateToResetMoney = 0;
        this.#countRoundToWin = countRoundToWin;
        this.#betsDescription = betsDescription;
        this.#tacticDescription = tacticDescription;
        this.#minimalBet = minimalBet;
        this.#selectDiceToRerollFunction =
            selectDiceToRerollFunction ||
            function () {
                return [];
            };
    }

    get initMoney() {
        return this.#initMoney;
    }

    get id() {
        return this.#id;
    }

    get money() {
        return this.#money;
    }

    get countRoundToWin() {
        return this.#countRoundToWin;
    }

    getInfo() {
        return {
            id: this.#id,
            image: this.#image,
            name: this.#name,
            money: this.#money,
            betsDescription: this.#betsDescription,
            tacticDescription: this.#tacticDescription,
            playerNeedMoneyToPlay: this.#minimalBet,
            countRoundToWin: this.#countRoundToWin,
            isNotReadyToPlay: this.isNotReadyToPlay(),
        };
    }

    selectDiceToReroll(resultOfThrow) {
        return this.#selectDiceToRerollFunction(resultOfThrow);
    }

    #updateMoney(newMoney) {
        this.#money = newMoney;
        if (this.#money < this.#initMoney && this.#dateToResetMoney !== 0) {
            const currentDate = new Date();
            currentDate.setHours(
                currentDate.getHours() + this.#moneyRecoveryHours
            );
            this.#dateToResetMoney = currentDate;
        }
    }

    setMoney(money) {
        this.#updateMoney(money);
    }

    addMoney(increment) {
        const newValue = this.#money + increment;
        this.#updateMoney(newValue);
    }

    getdDateToResetMoney() {
        return this.#dateToResetMoney;
    }

    resetMoney() {
        this.#money = this.#initMoney;
        this.#dateToResetMoney = 0;
    }

    generateStartBet() {
        return {
            small: this.#minimalBet,
            medium: this.#minimalBet * 2,
            big: this.#minimalBet * 5,
        };
    }

    generateBetAfterFirsThrowOfRound() {
        return {
            small: 0,
            medium: this.#minimalBet,
            big: this.#minimalBet * 2,
        };
    }

    generateOptionalBet(playerPower, opponentPower) {
        const playerCombination = Math.floor(playerPower / 100);
        const opponentCombination = Math.floor(opponentPower / 100);
        if (opponentCombination - playerCombination >= 1) {
            return {
                small: this.#minimalBet / 2,
                medium: this.#minimalBet,
                big: this.#minimalBet * 2,
            };
        }
        return null;
    }

    isNotReadyToPlay() {
        return this.#minimalBet * 5 * this.#countRoundToWin >= this.#money;
    }
}

export class Opponents {
    static HAREN = "haren";
    static ODO = "odo";
    static TALER = "taler";
    static ZOLTAN = "zoltan";
    static KING = "king";
    static GHOST = "ghost";
    static LOCAL_STORAGE_KEY = "opponents";

    #opponentsList;
    constructor(...opponentsData) {
        this.#opponentsList = opponentsData;
    }

    get opponents() {
        return this.#opponentsList;
    }

    getOpponentsInfoList() {
        return this.#opponentsList.map((opponent) => opponent.getInfo());
    }

    getOpponetById(opponentId) {
        return this.#opponentsList.filter(
            (opponent) => opponent.id === opponentId
        )[0];
    }

    saveOpponentsInLocalStorage() {
        const opponentsData = {};
        this.#opponentsList.forEach((opponent) => {
            const key = opponent.id;
            const money = opponent.money;
            const dateToResetMoney = opponent.getdDateToResetMoney();
            opponentsData[key] = { money, dateToResetMoney };
        });

        localStorage.setItem(
            Opponents.LOCAL_STORAGE_KEY,
            JSON.stringify(opponentsData)
        );
    }

    loadOpponentsDataFromLocalStorage() {
        const localStorageData = localStorage.getItem(
            Opponents.LOCAL_STORAGE_KEY
        );
        if (localStorageData) {
            const opponentsData = JSON.parse(localStorageData);
            const opponentsKeys = Object.keys(opponentsData);

            opponentsKeys.forEach((key) => {
                const savedDate = opponentsData[key].dateToResetMoney;
                if (savedDate !== 0) {
                    const dateToResetMoney = new Date(savedDate);
                    const currentDate = new Date();
                    currentDate.setHours(currentDate.getHours() + 34);
                    if (dateToResetMoney < currentDate) {
                        this.getOpponetById(key).resetMoney();
                        return;
                    }
                }

                this.getOpponetById(key).setMoney(opponentsData[key].money);
            });
        }
    }

    setMoneyToOpponentById(opponentId, money) {
        const opponent = this.getOpponetById(opponentId);
        opponent.setMoney(money);
    }

    setCurrentOpponentFirstInList(opponentId) {
        const targetIndex = this.#opponentsList.findIndex(
            (opponent) => opponentId === opponent.id
        );
        if (targetIndex !== -1) {
            const removedItem = this.#opponentsList.splice(targetIndex, 1)[0];
            this.#opponentsList.unshift(removedItem);
        }
    }
}
