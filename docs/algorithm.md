# SM2
[SM2](https://super-memory.com/english/ol/sm2.htm) provides a more detailed explanation.

## Formulas

### Interval
I(1):=1
I(2):=6
for n>2 I(n):=I(n-1)*EF

For those of us without a math education:
This essentially says, "If this is the first interval, the next interval is 1. If it's the second interval occurrence, the next interval is 6. After that, it's equal to previous interval (n-1) multiplied by the Easiness Factor (EF)."

### Easiness Factor (EF)
EF':=f(EF,q)

Mathless:
The new Easiness Factor (EF') is equal to the function using the current Easiness Factor (EF) and the Quality of the Response (q).

### Function (f)
EF':=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))

Reduced:
EF':=EF-0.8+0.28*q-0.02*q*q

There's a bit here, but essentially this formula creates the behavior that if you score a 5, the Easiness Factor will ensure the Interval will get wider, if you score okay, the Interval stays mostly the same, and if you do bad, the Interval gets a lot shorter. You can see this in respective order pretty easily in the reduced formula.

## Response Meanings
Response qualities:
5 - perfect response
4 - correct response after a hesitation
3 - correct response recalled with serious difficulty
2 - incorrect response; where the correct one seemed easy to recall
1 - incorrect response; the correct one remembered
0 - complete blackout.
