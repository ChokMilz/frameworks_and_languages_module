from example import *

def test_add():
    assert add(1, 2) == 3
    assert add(1, -2) == -1
    assert add(1000000000000000000, 2) == 1000000000000000002

def test_multiply():
    assert multiply(1, 2) == 2
    assert multiply(-1, -2) == 2
    assert multiply(100000000, 2) == 200000000
