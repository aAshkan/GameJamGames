#include <iostream>
#include <cstring>
#include <ctime>
#include <mutex>
#include <vector>
#include <thread>
#include "HexBoard.h"
using namespace std;

	mutex mtx;
class HexGame {		// Manages the game
private:
	HexBoard hb;
	int turn;			// 1 = P1 -1 = P2
	bool AI;			// true = yes, false = no
	int **weights;
public:
	HexGame();			//initialized the game
	bool isNum(string s);	//validation
	void play();			//gameplay
	void promptMove(int &x, int &y, int turn);	//prompt user for coordinates
	void easyBotMove(int &x, int &y);		//simple AI
	void MonteCarloBotMove(int &x, int &y, int n);
	void calcWeight(int x, int y, int n);
	void calcWeights(int **spaces, int n);
	void zeroWeights();
};

HexGame::HexGame() {
	int size;
	string input;
	char answer;

	while (cout << "Please enter size of board: ", getline(cin, input), !isNum(input));			//validation
	size = atoi(input.c_str());			//set the size of the board

	while (cout << "Play against AI? (y/n): ", getline(cin, input), answer = toupper(input[0]), answer != 'Y' && answer != 'N');	//multiplayer or AI
	if (answer == 'Y') {
		AI = true;
		srand(time(NULL));
	}
	else
		AI = false;

	hb = HexBoard(size);		//create board
	turn = 1;
	weights = new int*[size];
	
	for (int i = 0; i < size; i++) {
		weights[i] = new int[size];
	}
}

void HexGame::zeroWeights() {
	int size = hb.getSize();
	for (int y = 0; y < size; y++) {
		for (int x = 0; x < size; x++) {
			weights[y][x] = 0;
		}
	}
}

void HexGame::easyBotMove(int &x, int &y) {		//Random AI
	int limit = hb.getSize();
	x = rand() % limit;
	y = rand() % limit;
}

void HexGame::MonteCarloBotMove(int &x, int &y, int n) {
	int size = hb.getSize();
	int **spaces = new int*[size];

	for (int i = 0; i < size; i++) {
		spaces[i] = new int[size];
		for (int j = 0; j < size; j++) {
			spaces[i][j] = 0;
		}		
	}

	calcWeights(spaces, n);
	x = 0;
	y = 0;
	for (int i = 0; i < size; i++) {
		for (int j = 0; j < size; j++) {
			if (spaces[i][j] > spaces[y][x]) {
				x = j;
				y = i;
			}	 
		}
	}
}

void HexGame::calcWeights(int **spaces, int n) {
	int size = hb.getSize();
	thread cloth[size][size];

//	zeroWeights();
	for (int y = 0; y < size; y++) {
		for (int x = 0; x < size; x++) {
			if (hb.isEmptyAt(x, y)) {
//				spaces[y][x] = calcWeight(x, y, n);
				cloth[y][x] = thread(&HexGame::calcWeight, this, ref(x), ref(y), ref(n));
				(cloth[y][x]).join();
			}
		}
	}

        for (int y = 0; y < size; y++) {
                for (int x = 0; x < size; x++) {
                        if (hb.isEmptyAt(x, y)) {
//cout << "x: " << x << " y: " << y << " weight: " << weights[y][x] << endl;
				spaces[y][x] = weights[y][x];
			}
		}
	}
} 

void HexGame::calcWeight(int x, int y, int n) {
	mtx.lock();
	HexBoard copy;
	weights[y][x] = 0;

	for (int i = 0; i < n; i++) {
		copy = HexBoard(hb);
		copy.set(x, y, -1);
		copy.populate();
		weights[y][x] += ( copy.isFinished(1)? 0 : 1 );
	}
//cout << "	x: " << x << " y: " << y << " weight: " << weights[y][x] << endl;
	mtx.unlock();
}
/*
void HexGame::calcWeights(int **&spaces) {
        HexBoard copy = HexBoard(hb);
        int size = hb.getSize();

        for (int y = 0; y < size; y++) {
                for (int x = 0; x < size; x++) {
                        if (hb.isEmptyAt(x, y)) {
                                copy.set(x, y, -1);
                                copy.populate();
                                spaces[y][x] = ( copy.isFinished(1)? 0 : 1 );
                        }
                }
        }
}

void HexGame::MonteCarloBotMove(int &x, int &y, int n) {
        int size = hb.getSize();	
        int spaces[n][size][size];
	int results[size][size];
	thread cloth[n];

        for (int i = 0; i < n; i++) {
		cloth[i] = thread(&HexGame::calcWeights, this, ref(spaces[i]));
        }

	for (int i = 0; i < size; i++) {
		for (int j = 0; j < size; j++) {
			results[i][j] = 0;
		}
 	}

        for (int i = 0; i < n; i++) {
		cloth[i].join();

                for (int j = 0; j < size; j++) {
			for (int k = 0; k < size; k++) {
                        	results[j][k] += spaces[i][j][k];
			}
                }
        }

        x = 0;
        y = 0;
        for (int i = 0; i < size; i++) {
                for (int j = 0; j < size; j++) {
                        if (results[i][j] > results[y][x]) {
                                x = j;
                                y = i;
                        }
                }
        }
}
*/
void HexGame::play() {
	int x, y;
	bool error = false;
	
	while(!hb.isFinished(-1*turn)) {		//check for winner
		if (!error) {
			cout << hb;
			cout << (turn > 0 ? "Player 1" : "Player 2") << "'s turn:\n";
		}

//		(AI && turn < 0) ? easyBotMove(x, y) : promptMove(x, y, turn);		//deciding to use AI or let the 2nd player move
		(AI && turn < 0)? MonteCarloBotMove(x, y, 100) : promptMove(x, y, turn);		//deciding to use AI or let the 2nd player move

		if (hb.set(x, y, turn)) {		//return true if the move is valid
			cout << endl << (turn > 0 ? "Player 1" : "Player 2") << " moved [" << x << ", " << y << "]\n";
			error = false;
			turn = -1 * turn;		//changing the player/turn
		}
		else {
			cout << "Error: Invalid coordinates. ";
			error = true;
		}
	}

	cout << hb;
	cout << ( (-1*turn > 0)? "Player 1" : "Player 2" ) << " wins!\n";
}

void HexGame::promptMove(int &x, int &y, int turn) {		//prompting the player 
	string input;

	while (cout << "Please enter x-coordinate: ", getline(cin, input), !isNum(input));
	x = atoi(input.c_str());
	while (cout << "Please enter y-coordinate: ", getline(cin, input), !isNum(input));
	y = atoi(input.c_str());
}

bool HexGame::isNum(string s) {			//validating
	for (int i = 0; i < strlen(s.c_str()); i++)
		if (!isdigit(s[i]))
			return false;
	return true;
}

int main() {
	HexGame hex;
	hex.play();

	return 0;
}
