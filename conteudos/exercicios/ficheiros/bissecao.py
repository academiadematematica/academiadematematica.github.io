def f(x):
    return 3**x + x - 3

a = 0
b = 2
erro = 0.000001
n = 0
while b - a > erro:
    m = (a + b) / 2
    if f(a) * f(m) <= 0:
        b = m
    else:
        a = m
    n = n + 1
print(n, (a + b) / 2)
