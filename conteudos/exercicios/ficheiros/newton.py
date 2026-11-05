def f(x):
    return x**5 - 3*x**2 + 1

def df(x):
    return 5*x**4 - 6*x

x = 5
erro = 0.000001
n = 0
while True:
    novo = x - f(x) / df(x)
    n = n + 1
    if abs(novo - x) <= erro:
        break
    x = novo
print(n, novo)
