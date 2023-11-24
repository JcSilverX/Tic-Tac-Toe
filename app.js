
const WINNING_COMBINATIONS = [
        [ 0, 1, 2 ],
        [ 3, 4, 5 ],
        [ 6, 7, 8 ],
        [ 0, 3, 6 ],
        [ 1, 4, 7 ],
        [ 2, 5, 8 ],
        [ 0, 4, 8 ],
        [ 2, 4, 6 ]
    ];

class TicTacToe {
    constructor(element) {
        this._element = element;

        this._playerX = this._element.querySelector('.game__playerX');
        this._playerO = this._element.querySelector('.game__playerO');
        this._gameboard = this._element.querySelector('.game-board');
        this._gameboardItems = this._element.querySelectorAll('.game-board__item');
        this._winner = document.querySelector('.winner');
        this._winnerMessage = this._winner.querySelector('.winner__message');
        this._winnerDescription = this._winner.querySelector('.winner__description');
    };

    // getters/setters

    // public methods
    toggle(relatedTarget) {
        return this._isXTurn() ? this.circle(relatedTarget) : this.x(relatedTarget);
    }

    x(relatedTarget) {
        if (this._isXTurn()) return;

        this._gameboard.classList.add('x');
        relatedTarget.classList.add('x');
        this._playerX.classList.add('active');
        this._playerO.classList.remove('active');
        this._gameboard.classList.remove('o');
    }

    circle(relatedTarget) {
        if (!this._isXTurn()) return;

        this._gameboard.classList.add('o');
        relatedTarget.classList.add('o');
        this._playerO.classList.add('active');
        this._playerX.classList.remove('active');
        this._gameboard.classList.remove('x');
    }

    isWinner(currentClass) {
        return WINNING_COMBINATIONS.some((combination) => {
            return combination.every((indx) => {
                return this._gameboardItems[indx].classList.contains(currentClass);
            });
        });
    }

    isDraw() {
        return [...this._gameboardItems].every((item) => {
            return item.classList.contains('x') || item.classList.contains('o');
        });
    }

    endGame(draw) {
        if (draw) {
            this._winner.classList.add('show');
            this._winnerMessage.innerText = 'X O';
            this._winnerDescription.innerText = 'DRAW!';
        } else {
            this._winner.classList.add('show');
            this._winnerMessage.innerText = `
                    ${ !this._isXTurn() ? 'O' : 'X' }
                `;
            this._winnerDescription.innerText = 'WINNER!';
        }
    }

    restart() {
        this._gameboardItems.forEach((item) => {
            item.classList.remove('x', 'o');
            item.removeEventListener('click', TicTacToe.clickHandler);
            item.addEventListener('click', TicTacToe.clickHandler, { once: true } );
        });

        this._gameboard.classList.remove('x', 'o');
        this._playerX.classList.remove('active');
        this._playerO.classList.remove('active');
        this._winner.classList.remove('show');
    }

    // private methods
    _isXTurn() {
        return this._gameboard.classList.contains('x');
    }

    // static methods
    static clickHandler(event) {
        const game = document.querySelector('.game');
        const instance = new TicTacToe(game);

        event.preventDefault();

        if (this.dataset.jsxBtn === 'item') {
            instance.toggle(this);

            if (instance.isWinner(this.classList[2])) {
                instance.endGame(false);
            } else if (instance.isDraw()) {
                instance.endGame(true);
            }
            else {
                // do nothing
            }
        }

        if (this.dataset.jsxBtn === 'restart') {
            instance.restart();
            this.removeEventListener('click', TicTacToe.clickHandler);
            this.addEventListener('click', TicTacToe.clickHandler, { once: true } );
        }
    };
};


document.querySelectorAll('[data-jsx-btn]')
    .forEach((btn) => {
        btn.addEventListener('click', TicTacToe.clickHandler, { once: true } );
    });


window.addEventListener('load', () => {
    const game = document.querySelector('.game');

    new TicTacToe(game);
});