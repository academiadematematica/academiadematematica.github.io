import random
import statistics

mu = 50
sigma = 10
n = 40
amostras = 100
contem = 0
for i in range(amostras):
    amostra = [random.normalvariate(mu, sigma) for j in range(n)]
    media = statistics.mean(amostra)
    s = statistics.stdev(amostra)
    margem = 1.96 * s / n**0.5
    if media - margem <= mu <= media + margem:
        contem = contem + 1
print(contem)
