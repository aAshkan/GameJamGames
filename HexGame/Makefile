TARGET= Hex 
CC= g++
CFLAGS= -std=c++0x -pthread -g
DEPS = HexBoard.h
OBJ = Hex.o

%.o: %.cpp $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

$(TARGET): $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS)

clean:
	rm -f *.o
	rm -f $(TARGET)

.PHONY: default all clean

